import { ButtonBase, createStyles, Grid, Link, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { LinkedinLogo, RedditLogo, ToitLogo, TwitterLogo } from "../../misc/icons";
import { screenWidth } from "../MainView";

export const footerHeight = 490;

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      height: footerHeight,
      position: "absolute",
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.primary.dark,
      [theme.breakpoints.down("sm")]: {},
    },
    container: {
      display: "flex",
      paddingTop: 110,
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      [theme.breakpoints.up("md")]: {
        marginLeft: `calc((100% - ${screenWidth}px)/2)`,
        marginRight: `calc((100% - ${screenWidth}px)/2)`,
      },
      [theme.breakpoints.only("xs")]: {
        paddingTop: theme.spacing(5),
      },
    },
    social: {
      paddingTop: theme.spacing(6),
      width: 92,
      display: "flex",
      justifyContent: "space-between",
    },
    heading: {
      fontFamily: "roboto",
      fontSize: 20,
      color: theme.palette.primary.light,
    },
    link: {
      fontFamily: "roboto",
      fontSize: 16,
      color: theme.palette.primary.light,
      paddingTop: theme.spacing(3),
      cursor: "pointer",
    },
    copyright: {
      position: "absolute",
      bottom: theme.spacing(4),
      color: theme.palette.primary.light,
      left: theme.spacing(4),
      [theme.breakpoints.up("md")]: {
        left: `calc((100% - ${screenWidth}px)/2)`,
      },
    },
  });

interface FooterProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
}

class Footer extends React.Component<FooterProps> {
  state = {
    name: "",
    description: "",
    version: "",
    url: "",
  };
  componentDidMount() {}
  render() {
    return (
      <Grid container className={this.props.classes.footer}>
        <Grid container className={this.props.classes.container}>
          <Grid item xs={6} sm={3} md={6}>
            <ButtonBase>
              <ToitLogo />
            </ButtonBase>
            <Grid container direction="row" className={this.props.classes.social}>
              <ButtonBase>
                <TwitterLogo />
              </ButtonBase>
              <ButtonBase>
                <LinkedinLogo />
              </ButtonBase>
              <ButtonBase>
                <RedditLogo />
              </ButtonBase>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography className={this.props.classes.heading}>Developers</Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href="https://docs.toit.io" target="blank">
                Documentation
              </Link>
            </Typography>
            <Typography className={this.props.classes.link}>API</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography className={this.props.classes.heading}>Company</Typography>
            <Typography
              className={this.props.classes.link}
              onClick={() => this.props.history.push("https://toit.io/terms-of-service")}
            >
              Terms of service
            </Typography>
            <Typography className={this.props.classes.link}>Cookies policy</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography className={this.props.classes.heading}>Legal</Typography>
            <Typography className={this.props.classes.link}>About</Typography>
            <Typography className={this.props.classes.link}>Blog</Typography>
            <Typography className={this.props.classes.link}>FAQ</Typography>
            <Typography className={this.props.classes.link}>Contact us</Typography>
          </Grid>
        </Grid>
        <Typography className={this.props.classes.copyright}>© Toitware ApS. 2021.</Typography>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(Footer));
