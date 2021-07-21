import { createStyles, Grid, Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
  });

type ExploreProps = WithStyles<typeof styles>;

class ExploreView extends React.Component<ExploreProps> {
  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <p>Explore</p>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ExploreView);
