import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import { EmptyPackages } from "../../misc/icons";
import { Package } from "../ExploreView";
import Footer, { footerHeight } from "../general/Footer";
import SearchPackage from "./SearchPackage";

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
  searchQuery?: string;
  packages?: Package[];
}

interface SearchState {
  searchResult: string;
  searchParam: string;
}

class SearchView extends React.Component<SearchProps, SearchState> {
  state = {
    searchResult: "",
    searchParam: "",
  };

  componentDidUpdate(prevProp: SearchProps, prevState: SearchState) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchParam = urlParams.get("query") || "";
    if (searchParam !== prevState.searchParam) {
      this.setState({ searchParam: searchParam });
    }
  }

  render() {
    return (
      <>
        <Grid container className={this.props.classes.grid}>
          <Grid item xs={12}>
            <Typography variant="h5" className={this.props.classes.searchInfo}>
              {this.props.packages?.length === 1 ? "1 result" : this.props.packages?.length + " results"} for the
              search: {this.state.searchParam !== null ? this.state.searchParam : ""}{" "}
            </Typography>
            {this.props.packages?.map((element, key) => (
              <SearchPackage
                key={key}
                name={element.result.package.name}
                description={element.result.package.description}
                version={element.result.package.latestVersion}
                published={Date.now()}
                url={element.result.package.url}
              />
            ))}
            {this.props.packages?.length === 0 && (
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
