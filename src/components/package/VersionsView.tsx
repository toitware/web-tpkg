import { createStyles, Grid, Link, Theme, WithStyles } from "@material-ui/core";
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
        <Grid item container xs={12} direction="column">
          {this.props.pkgs.map((element, i) => (
            <Link
              href={new URL(
                this.props.pkgs[i].result.version.url.split("/").join("%2F") + "@v" + element.result.version.version,
                window.location.href
              ).toString()}
              key={i}
            >
              {element.result.version.version}
            </Link>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(VersionsView);
