import { Box, createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import PackageLineDetails from "./PackageLineDetails";

const styles = (theme: Theme) =>
  createStyles({
    featuredPackage: {
      backgroundColor: theme.palette.primary.light,
      minHeight: 150,
      borderRadius: 3,
    },
    link: {
      color: "inherit",
      textDecoration: "none",
    },
    featuredPackageContent: {
      padding: theme.spacing(2),
      "&:hover": {
        cursor: "pointer",
      },
    },
  });

interface PackageLineDetailsProps extends WithStyles<typeof styles>, RouteComponentProps {
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
        <Box className={this.props.classes.featuredPackage}>
          <Link
            to={"package/" + this.props.url.split("/").join("%2F") + "@v" + this.props.version}
            className={this.props.classes.link}
          >
            <Box className={this.props.classes.featuredPackageContent}>
              <Typography variant="h6">{this.props.name}</Typography>
              <Typography>{this.props.description}</Typography>
              <PackageLineDetails url={this.props.url} version={this.props.version} published={Date.now()} />
            </Box>
          </Link>
        </Box>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(PackageCard));
