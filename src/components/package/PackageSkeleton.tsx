import { createStyles, Grid, Theme, WithStyles, withStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      paddingTop: theme.spacing(4),
    },
    title: {
      width: "30%",
      height: 50,
    },
    text: {
      height: 30,
      marginTop: -5,
    },
    details: {
      width: "30%",
      height: 20,
    },
    skeleton: {
      marginTop: theme.spacing(4),
    },
  });

export type Package = {
  result: {
    package: {
      name: string;
      description: string;
      license: string;
      url: string;
      latestVersion: string;
    };
  };
};

type PackageSkeletonProps = WithStyles<typeof styles>;

class PackageSkeletonView extends React.Component<PackageSkeletonProps> {
  state = {
    data: [] as Package[],
    loading: false,
  };

  render() {
    return (
      <Grid className={this.props.classes.skeleton}>
        <Skeleton className={this.props.classes.title} />
        <Skeleton className={this.props.classes.text} />
        <Skeleton className={this.props.classes.text} />
        <Skeleton className={this.props.classes.details} />
      </Grid>
    );
  }
}

export default withStyles(styles)(PackageSkeletonView);
