import { createStyles, Grid, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Version } from "./DependenciesView";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
  });

interface VersionsProps extends WithStyles<typeof styles> {
  pkgs: Version[];
}

class VersionsView extends React.Component<VersionsProps> {
  state = {
    snackbar: false,
  };

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          {this.props.pkgs.map((element, i) => (
            <Typography key={i}>{element.result.version.version}</Typography>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(VersionsView);
