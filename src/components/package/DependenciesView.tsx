import { createStyles, Grid, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import Package from "../../data/package.json";

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

type DependenciesProps = WithStyles<typeof styles>;

interface DependenciesState {
  dependencies: Dependency[];
}

class DependenciesView extends React.Component<DependenciesProps, DependenciesState> {
  state = {
    dependencies: [] as Dependency[],
  };

  componentDidMount() {
    const data: Version = Package;
    console.log("Qvist: ", data);
    this.setState({ dependencies: data.result.version.dependencies });
  }

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          {this.state.dependencies.map((element, i) => (
            <Typography onClick={() => window.open("https://" + element.url)} key={i}>
              {element.url} (version:{element.version})
            </Typography>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DependenciesView);
