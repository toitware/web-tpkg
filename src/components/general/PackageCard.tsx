import { Box, createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Version } from "../package/DependenciesView";
import { http } from "../Search/SearchView";

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
  state = {
    name: "",
    description: "",
    version: "",
    url: "",
  };
  componentDidMount() {
    http(this.props.url)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        return response
          .split("\n")
          .filter((line) => {
            return line !== "";
          })
          .map((line) => {
            return JSON.parse(line);
          });
      })
      .then((lines) => {
        const lastIndex = lines.length - 1;
        const json = lines[lastIndex] as Version;
        this.setState({
          name: json.result.version.name,
          description: json.result.version.description,
          version: json.result.version.version,
          url: json.result.version.url,
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
  render() {
    return (
      <Grid item xs={4}>
        <Box
          className={this.props.classes.featuredPackage}
          onClick={() =>
            this.props.history.push("package/" + this.state.name + "&url=" + this.state.url.split("/").join("%2F"))
          }
        >
          <Box className={this.props.classes.featuredPackageContent}>
            <Typography variant="h6">{this.state.name}</Typography>
            <Typography>{this.state.description}</Typography>
            <Typography variant="body2">{this.state.version}</Typography>
          </Box>
        </Box>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(PackageCard));
