import { Box, createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import PackageLineDetails from "./PackageLineDetails";

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
  name: string;
  description: string;
  url: string;
  version: string;
  width: boolean | "auto" | 3 | 2 | 1 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
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

class PackageCard extends React.Component<PackageLineDetailsProps> {
  render() {
    return (
      <Grid item xs={this.props.width}>
        <Box
          className={this.props.classes.featuredPackage}
          onClick={() =>
            this.props.history.push(
              "package/" + this.props.name + "&url=" + this.props.url.split("/").join("%2F") + "&index=latest"
            )
          }
        >
          <Box className={this.props.classes.featuredPackageContent}>
            <Typography variant="h6">{this.props.name}</Typography>
            <Typography>{this.props.description}</Typography>
            <PackageLineDetails url={this.props.url} version={this.props.version} published={Date.now()} />
          </Box>
        </Box>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(PackageCard));
