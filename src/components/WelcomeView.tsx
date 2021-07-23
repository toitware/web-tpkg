import { Button, createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import SearchPackage from "./Search/SearchPackage";

const styles = (theme: Theme) =>
  createStyles({
    title: {
      paddingBottom: theme.spacing(4),
    },
    featured: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  });

interface WelcomeProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
}

class WelcomeView extends React.Component<WelcomeProps> {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={this.props.classes.title} variant="h1">
            Toit package registry
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={this.props.classes.featured} variant="h3">
            Explore packages
          </Typography>
          <Typography>Find inspiration by looking at all released packages</Typography>
          <Button
            variant="contained"
            color="primary"
            className={this.props.classes.button}
            onClick={() => this.props.history.push("/packages")}
          >
            All packages
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography className={this.props.classes.featured} variant="h3">
            Contribute
          </Typography>
          <Typography>
            You can contribute by publishing your packages to the Toit package registry. Read more about how to create
            your own package at <a href="https://docs.toit.io/language/package/">docs.toit.io</a>{" "}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={this.props.classes.button}
            onClick={() => this.props.history.push("/register")}
          >
            Contribute
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography className={this.props.classes.featured} variant="h3">
            Featured packages
          </Typography>
          <SearchPackage
            name="morse"
            description="Functions for International (ITU) Morse code."
            version="1.0.1"
            access="public"
            published={Date.now()}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography className={this.props.classes.featured} variant="h3">
            Latest packages
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(WelcomeView));
