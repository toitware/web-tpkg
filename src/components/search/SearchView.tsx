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
    const packages = this.props.packages?.filter((pkg) => {
      if (pkg.result === undefined) {
        return false;
      }
      return pkg.result.package.name.toLowerCase().indexOf(searchParam?.toLowerCase() || "") >= 0;
    });
    this.setState({
      filteredPackages: packages,
      searchParam: searchParam,
    });
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
