// Copyright (C) 2023 Toitware ApS. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import { createStyles, Grid, Link, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { LinkedinLogo, RedditLogo, ToitLogo, TwitterLogo } from "../../misc/icons";
import { docs, toitio } from "../header/ToolbarTop";
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
            <Link href={toitio} target="blank">
              <ToitLogo />
            </Link>
            <Grid container direction="row" className={this.props.classes.social}>
              <Link href="https://twitter.com/toitware" target="blank">
                <TwitterLogo />
              </Link>
              <Link href="https://www.linkedin.com/company/toitio" target="blank">
                <LinkedinLogo />
              </Link>
              <Link href="https://www.reddit.com/r/toit/" target="blank">
                <RedditLogo />
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography className={this.props.classes.heading}>Developers</Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href={docs} target="blank">
                Documentation
              </Link>
            </Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href="https://docs.toit.io/apis/api" target="blank">
                API
              </Link>
            </Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href="https://help.toit.io/" target="blank">
                Help
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography className={this.props.classes.heading}>Legal</Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href="https://toit.io/terms-of-service" target="blank">
                Terms of service
              </Link>
            </Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href="https://toit.io/cookies-policy" target="blank">
                Cookies policy
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography className={this.props.classes.heading}>Company</Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href="https://toit.io/company/about" target="blank">
                About
              </Link>
            </Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href="https://blog.toit.io/" target="blank">
                Blog
              </Link>
            </Typography>
            <Typography className={this.props.classes.link}>
              <Link className={this.props.classes.link} href="mailto:contact@toit.io">
                Contact us
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Typography className={this.props.classes.copyright}>© Toitware ApS</Typography>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(Footer));
