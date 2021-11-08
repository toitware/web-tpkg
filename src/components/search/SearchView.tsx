import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import { EmptyPackages } from "../../misc/icons";
import { Package } from "../ExploreView";
import Footer, { footerHeight } from "../general/Footer";
import SearchPackage from "./SearchPackage";

export function getSearchString(): string | undefined {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("query") || undefined;
}

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      paddingTop: 123,
      paddingBottom: footerHeight + 120,
    },
    searchInfo: {
      marginBottom: theme.spacing(2),
    },
    emptyPackages: {
      width: "100%",
      height: "100%",
    },
    container: {
      height: "300px",
    },
  });

interface SearchProps extends WithStyles<typeof styles> {
  packages?: Package[];
}

interface SearchState {
  searchParam?: string;
  filteredPackages?: Package[];
}

class SearchView extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    searchParam: getSearchString(),
  };

  componentDidMount() {
    this.onUpdate();
  }

  componentDidUpdate(prevProp: SearchProps, prevState: SearchState) {
    const searchParam = getSearchString();
    if (this.state.searchParam === searchParam && this.props.packages === prevProp.packages) {
      return;
    }
    this.onUpdate();
  }

  onUpdate() {
    const searchParam = getSearchString();
    const words = SearchView.searchParamToWordList(searchParam || "");
    const packages = SearchView.best10(words, this.props.packages);

    this.setState({
      filteredPackages: packages,
      searchParam: searchParam,
    });
  }

  static searchParamToWordList(searchParam: string) {
    const words = searchParam.split(/[^a-z0-9]+/i).flatMap((str) => {
      if (str === "") return [];
      // If we have long numbers or strings in the word we use them as independent search terms.
      // So for example tm1640 will use 1640 as a search term, but not tm because it's too short.
      // Zyxel2 will use Zyxel as a search term, even without the "2".
      const components = str.match(/(?:[0-9]{3,})|(?:[a-z]{3,})/gi);
      if (components) {
        components.push(str);
        return components.map((str) => str.toLowerCase());
      } else {
        return [str.toLowerCase()];
      }
    });
    return words;
  }

  static best10(words: string[], packages?: Package[]): Package[] {
    class ScoredPackage {
      constructor(public pkg: Package, public score: number) {}
    }
    if (!packages) return [];
    const scoredPackages = packages.flatMap((pkg): ScoredPackage[] => {
      if (pkg.result === undefined) {
        return []
      }
      let score = 0;
      for (const word of words) {
        if (pkg.result.package.name.toLowerCase().indexOf(word) >= 0) score += 10;
        if (pkg.result.package.description.toLowerCase().indexOf(word) >= 0) score += 2;
        if (word !== "http" && word !== "https" && word !== "www" && word !== "github" && word !== "toit") {
          if (pkg.result.package.url.toLowerCase().indexOf(word) >= 0) score += 2;
        }
      }
      if (score === 0) {
        return [];
      } else {
        return [new ScoredPackage(pkg, score)];
      }
    });

    scoredPackages.sort((first, second) => second.score - first.score);
    return scoredPackages.slice(0, 10).map((scored) => scored.pkg);
  }

  render() {
    return (
      <>
        <Grid container className={this.props.classes.grid}>
          <Grid item xs={12}>
            <Typography variant="h5" className={this.props.classes.searchInfo}>
              {this.state.filteredPackages?.length === 1
                ? "1 result"
                : this.state.filteredPackages?.length + " results"}{" "}
              for the search: {this.state.searchParam !== null ? this.state.searchParam : ""}{" "}
            </Typography>
            {this.state.filteredPackages?.map((element, key) => {
              if (element.result === undefined) {
                return null;
              }

              return (
                <SearchPackage
                  key={key}
                  name={element.result.package.name}
                  description={element.result.package.description}
                  version={element.result.package.latestVersion}
                  published={Date.now()}
                  url={element.result.package.url}
                />
              );
            })}
            {this.state.filteredPackages?.length === 0 && (
              <Grid container>
                <Grid item xs={4}>
                  <EmptyPackages className={this.props.classes.emptyPackages} />{" "}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles)(SearchView);
