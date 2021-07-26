import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import SearchPackage from "./SearchPackage";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    searchInfo: {
      marginBottom: theme.spacing(2),
    },
  });

interface SearchProps extends WithStyles<typeof styles> {
  searchQuery?: string;
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
    http("http://localhost:8733/api/v1/packages")
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        return response
          .split("\n")
          .filter((line) => {
            return line != "";
          })
          .map((line) => {
            return JSON.parse(line);
          });
      })
      .then((lines) => {
        console.log(lines);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h5" className={this.props.classes.searchInfo}>
            {1 === 1 ? "1 result" : 1 + " results"} for the search:{" "}
            {this.state.searchParam !== null ? this.state.searchParam : ""}{" "}
          </Typography>
          {/* TODO for loop looping through search results display all packages with the format as showed below */}
          <SearchPackage
            name="morse"
            description="Functions for International (ITU) Morse code."
            version="1.0.1"
            access="public"
            published={Date.now()}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchView);
