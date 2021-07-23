import { createStyles, Grid, Theme, Typography, WithStyles } from "@material-ui/core";
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

type ReadmeProps = WithStyles<typeof styles>;

class ReadmeView extends React.Component<ReadmeProps> {
  state = {
    snackbar: false,
  };

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h2">morse</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ReadmeView);
