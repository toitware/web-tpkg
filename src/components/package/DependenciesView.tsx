import { createStyles, Grid, Link, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
  });

export type Dependency = {
  url: string;
  version: string;
};

export type Version = {
  result: {
    version: {
      name: string;
      description: string;
      license: string;
      url: string;
      version: string;
      dependencies: Dependency[];
    };
  };
};

interface DependenciesProps extends WithStyles<typeof styles> {
  pkg: Version;
}

interface DependenciesState {
  dependencies: Dependency[];
}

class DependenciesView extends React.Component<DependenciesProps, DependenciesState> {
  state = {
    dependencies: [] as Dependency[],
  };

  componentDidMount() {}

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          {this.props.pkg.result.version.dependencies.length > 0 ? (
            this.props.pkg.result.version.dependencies.map((element, i) => (
              <Typography key={i}>
                <Link
                  href={new URL(
                    `url=${element.url.split("/").join("%2F")}&index=latest`,
                    window.location.href
                  ).toString()}
                >
                  {element.url} ({element.version})
                </Link>
              </Typography>
            ))
          ) : (
            <Typography>No dependencies</Typography>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DependenciesView);
