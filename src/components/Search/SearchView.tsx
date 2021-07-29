import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
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
  });

interface SearchProps extends WithStyles<typeof styles> {
  searchQuery?: string;
  packages?: Package[];
}

interface SearchState {
  searchResult: string;
  searchParam: string;
}

export async function http<T>(url: string): Promise<Response> {
  const response: Response = await fetch(url);
  return response;
}

export const API_URL_PACKAGES = "http://localhost:8733/api/v1/packages";

class SearchView extends React.Component<SearchProps, SearchState> {
  state = {
    searchResult: "",
    searchParam: "",
  };

  async componentDidMount() {
    console.log("SEARCH!");
    this.setState({ searchParam: "", searchResult: "" });
    const queryString = window.location.search;
    console.log("query string: ", queryString);
    const urlParams = new URLSearchParams(queryString);
    const searchParam = urlParams.get("query");
    this.setState({ searchParam: searchParam || "" });
    this.setState({ searchResult: "Content" });
    console.log("Starting fetch");
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
            {/* TODO for loop looping through search results display all packages with the format as showed below */}
            {this.props.packages?.map((element, key) => (
              <SearchPackage
                key={key}
                name={element.result.package.name}
                description={element.result.package.description}
                version={element.result.package.latestVersion}
                access="public"
                published={Date.now()}
                url={element.result.package.url}
              />
            ))}
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles)(SearchView);
