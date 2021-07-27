import { Button, createStyles, Grid, Theme, Typography, withStyles, WithStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { tigerShade } from "../assets/theme/theme";
import PackageCard from "./general/PackageCard";

const styles = (theme: Theme) =>
  createStyles({
    title: {
      paddingBottom: theme.spacing(4),
    },
    featured: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
    featuredSectionBg: {
      backgroundColor: tigerShade,
      content: "",
      top: 310,
      position: "absolute",
      left: "50%",
      transform: "translateX( -50%)",
      height: 550,
      width: "100vw",
    },
    featuredSection: {
      marginTop: 107,
      zIndex: 1,
      marginBottom: theme.spacing(10),
    },

    button: {
      marginTop: theme.spacing(2),
    },
    container: {
      marginTop: 123,
    },
  });

interface WelcomeProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
}

class WelcomeView extends React.Component<WelcomeProps> {
  render() {
    return (
      <Grid container className={this.props.classes.container}>
        <Grid item xs={12} className={this.props.classes.featuredSectionBg} />
        <Grid item xs={12} className={this.props.classes.featuredSection}>
          <Typography className={this.props.classes.title} variant="h2">
            Featured packages
          </Typography>{" "}
          <Grid container spacing={2}>
            <PackageCard url="http://localhost:8733/api/v1/packages/github.com/toitware/toit-color-tft/versions" />
            <PackageCard url="http://localhost:8733/api/v1/packages/github.com/andersjohnsen/pid/versions" />
            <PackageCard url="http://localhost:8733/api/v1/packages/github.com/toitware/bme280-driver/versions" />
            <PackageCard url="http://localhost:8733/api/v1/packages/github.com/toitware/toit-font-google-100dpi-roboto/versions" />
            <PackageCard url="http://localhost:8733/api/v1/packages/github.com/toitware/ublox-gnss-driver/versions" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography className={this.props.classes.featured} variant="h2">
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
            <Typography className={this.props.classes.featured} variant="h2">
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
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(WelcomeView));
