import { Box, createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Version } from "../package/DependenciesView";

const styles = (theme: Theme) =>
  createStyles({
    featuredPackage: {
      backgroundColor: theme.palette.primary.light,
      minHeight: 150,
      borderRadius: 3,
    },
    featuredPackageContent: {
      padding: theme.spacing(2),
      "&:hover": {
        cursor: "pointer",
      },
    },
  });

interface PackageLineDetailsProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
  url: string;
  width: boolean | "auto" | 3 | 2 | 1 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
}

interface PackageCardState {
  name: string;
  description: string;
  version: string;
  url: string;
}

export type Pkg = {
  result: {
    version: {
      name: string;
      description: string;
      license: string;
      version: string;
      url: string;
      dependencies: string[];
    };
  };
};

class PackageCard extends React.Component<PackageLineDetailsProps, PackageCardState> {
  async componentDidMount() {
    try {
      const response = await fetch(this.props.url);
      const text = await response.text();
      const split = await text.split("\n");
      const filter = await split.filter((line) => {
        return line !== "";
      });
      const map = await filter.map((line) => {
        return JSON.parse(line);
      });
      const lines = map as Version[];
      const lastIndex = lines.length - 1;
      const json = lines[lastIndex];
      this.setState({
        name: json.result.version.name,
        description: json.result.version.description,
        version: json.result.version.version,
        url: json.result.version.url,
      });
    } catch (error) {
      console.log("Error fetching", error);
    }
  }
  render() {
    const state: PackageCardState = this.state || {};
    return (
      <Grid item xs={this.props.width}>
        <Box
          className={this.props.classes.featuredPackage}
          onClick={() => this.props.history.push("package/" + state.name + "&url=" + state.url.split("/").join("%2F"))}
        >
          <Box className={this.props.classes.featuredPackageContent}>
            <Typography variant="h6">{state.name}</Typography>
            <Typography>{state.description}</Typography>
            <Typography variant="body2">{state.version}</Typography>
          </Box>
        </Box>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(PackageCard));
