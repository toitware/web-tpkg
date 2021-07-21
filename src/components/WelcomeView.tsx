import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import SearchPackage from "./Search/SearchPackage";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    title: {
      paddingTop: theme.spacing(7),
    },
    featured: {
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(2),
    },
  });

type WelcomeProps = WithStyles<typeof styles>;

class WelcomeView extends React.Component<WelcomeProps> {
  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography className={this.props.classes.title} variant="h1">
            Toit package registry
          </Typography>
          <Typography className={this.props.classes.featured} variant="h3">
            Features packages
          </Typography>
          <SearchPackage
            name="toit-morse"
            description="Functions for International (ITU) Morse code."
            version="1.0.1"
            access="private"
            published={Date.now()}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(WelcomeView);
