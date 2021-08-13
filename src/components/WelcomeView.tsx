import {
  Button,
  createStyles,
  Grid,
  isWidthUp,
  Link,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import withWidth, { WithWidth } from "@material-ui/core/withWidth";
import { History } from "history";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { RouteComponentProps, withRouter } from "react-router";
import { ReactComponent as PackagesImage } from "../assets/images/packages.svg";
import { tigerShade } from "../assets/theme/theme";
import Footer, { footerHeight } from "./general/Footer";
import PackageCard from "./general/PackageCard";

const fullFeaturedSectionHeight = 850;
const fullToSmallCut = 150;

const styles = (theme: Theme) =>
  createStyles({
    title: {
      paddingBottom: theme.spacing(4),
    },
    featured: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(2),
    },
    featuredSectionBg: {
      backgroundColor: tigerShade,
      content: "",
      top: 0,
      position: "absolute",
      left: "50%",
      transform: "translateX( -50%)",
      height: fullFeaturedSectionHeight,
      width: "100vw",
      zIndex: -1,
      [theme.breakpoints.down("sm")]: {
        height: fullFeaturedSectionHeight - fullToSmallCut,
      },
    },
    featuredSection: {
      zIndex: 1,
      marginBottom: theme.spacing(10),
      marginTop: 330,
    },
    button: {
      marginTop: theme.spacing(2),
    },
    container: {
      paddingBottom: footerHeight + 120,
    },
    carousel: {
      height: 332 - fullToSmallCut,
    },
    text: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    packagesImage: {
      alignSelf: "flex-end",
    },
  });

interface WelcomeProps extends WithStyles<typeof styles>, RouteComponentProps, WithWidth {
  history: History;
}

class WelcomeView extends React.Component<WelcomeProps> {
  render() {
    return (
      <>
        <Grid container className={this.props.classes.container}>
          <Grid item xs={12} className={this.props.classes.featuredSectionBg} />
          <Grid item xs={12} className={this.props.classes.featuredSection}>
            <Typography className={this.props.classes.title} variant="h2">
              Featured packages
            </Typography>{" "}
            {isWidthUp("md", this.props.width) ? (
              <Grid container spacing={2}>
                <PackageCard width={4} url={"v1/packages/github.com/toitware/toit-color-tft/versions"} />
                <PackageCard width={4} url={"v1/packages/github.com/andersjohnsen/pid/versions"} />
                <PackageCard width={4} url={"v1/packages/github.com/toitware/bme280-driver/versions"} />
                <PackageCard
                  width={4}
                  url={"v1/packages/github.com/toitware/toit-font-google-100dpi-roboto/versions"}
                />
                <PackageCard width={4} url={"v1/packages/github.com/toitware/ublox-gnss-driver/versions"} />
              </Grid>
            ) : (
              <Carousel className={this.props.classes.carousel}>
                <Grid container spacing={2} key={0}>
                  <PackageCard width={6} url={"v1/packages/github.com/toitware/toit-color-tft/versions"} />
                  <PackageCard width={6} url={"v1/packages/github.com/andersjohnsen/pid/versions"} />
                </Grid>
                <Grid container spacing={2} key={1}>
                  <PackageCard width={6} url={"v1/packages/github.com/toitware/bme280-driver/versions"} />
                  <PackageCard
                    width={6}
                    url={"v1/packages/github.com/toitware/toit-font-google-100dpi-roboto/versions"}
                  />
                </Grid>
                <Grid container spacing={2} key={2}>
                  <PackageCard width={6} url={"v1/packages/github.com/toitware/ublox-gnss-driver/versions"} />
                </Grid>
              </Carousel>
            )}
          </Grid>
          <Grid container spacing={1}>
            {isWidthUp("sm", this.props.width) && (
              <Grid item xs={12} sm={6} md={4} className={this.props.classes.packagesImage}>
                <PackagesImage width="80%" />
              </Grid>
            )}
            {isWidthUp("md", this.props.width) && <Grid item xs={2} />}
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={this.props.classes.featured} variant="h2">
                Learn
              </Typography>
              <Typography className={this.props.classes.text}>
                The process of writing a package is easier than you might think.
              </Typography>
              <Typography className={this.props.classes.text}>
                Go to the{" "}
                <Link target="_blank" href="https://docs.toit.io/language/package/">
                  Toit documentation
                </Link>{" "}
                to start learning how to write your first package.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                onClick={() => window.open("https://docs.toit.io/language/package/")}
              >
                Start learning
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={this.props.classes.featured} variant="h2">
                Explore packages
              </Typography>
              <Typography className={this.props.classes.text}>
                Find inspiration by looking at all released packages.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                onClick={() => this.props.history.push("/packages")}
              >
                All packages
              </Button>
            </Grid>
            {isWidthUp("md", this.props.width) && <Grid item xs={2} />}
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={this.props.classes.featured} variant="h2">
                Contribute
              </Typography>
              <Typography className={this.props.classes.text}>
                When you’re ready, you can contribute by publishing your packages to the Toit package registry.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                onClick={() => this.props.history.push("/publish")}
              >
                Publish package
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withWidth()(withRouter(withStyles(styles)(WelcomeView)));
