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
    description: {
      paddingTop: theme.spacing(2),
    },
  });

interface ReadmeProps extends WithStyles<typeof styles> {
  pkg: Version;
}

class ReadmeView extends React.Component<ReadmeProps> {
  state = {
    snackbar: false,
  };

  componentDidMount() {
    console.log(this.props.pkg);
  }

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h2">{this.props.pkg.result.version.name}</Typography>
        </Grid>
        <Grid item xs={12} className={this.props.classes.description}>
          <Typography variant="h5">Description</Typography>
          <Typography>{this.props.pkg.result.version.description}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ReadmeView);
