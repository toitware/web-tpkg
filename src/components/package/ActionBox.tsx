// Copyright (C) 2023 Toitware ApS. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import { Box, createStyles, Grid, Link, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { black, lightGray, white } from "../../assets/theme/theme";
import { ChevronRightIcon, LinkIcon } from "../../misc/icons";
import { SnackBar } from "../general/SnackBar";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 40,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: black,
      borderStyle: "solid",
      "&:hover": {
        backgroundColor: lightGray,
        boxShadow: "none",
        cursor: "pointer",
      },
      marginLeft: 0,
      width: "100%",
      marginTop: theme.spacing(1),
    },
    icon: {},
    iconLink: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(0.5),
      marginTop: 5,
      color: white,
    },
    install: {
      fontFamily: "Roboto Mono",
      fontWeight: 400,
      fontSize: 14,
      paddingRight: theme.spacing(2),
      marginTop: 4,
    },
    text: {
      fontFamily: "Roboto Mono",
      fontWeight: 400,
      fontSize: 14,
    },
    fatText: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: 14,
    },
    box: {
      display: "contents",
      "&:hover": {
        cursor: "pointer",
      },
      textDecoration: "none",
      "&:hover, &:focus, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
      color: black,
    },
    boxUrl: {
      display: "contents",
      marginTop: theme.spacing(2),
      "&:hover": {
        cursor: "pointer",
        fontWeight: 500,
      },
    },
    containerUrl: {
      paddingTop: theme.spacing(0.5),
    },
  });

interface ActionBoxProps extends WithStyles<typeof styles> {
  type: "copy" | "url";
  text: string;
}

interface ActionBoxState {
  snackbar: boolean;
}

class ActionBox extends React.Component<ActionBoxProps, ActionBoxState> {
  handleCopyInstallationText(text: string) {
    void navigator.clipboard.writeText(text);
    this.setState({ snackbar: true });
    analytics.track("Copied Installation Line", { line: text });
  }

  componentDidMount() {}

  render() {
    const state: ActionBoxState = this.state || {};
    if (this.props.type === "copy")
      return (
        <Box onClick={() => this.handleCopyInstallationText(this.props.text)} className={this.props.classes.box}>
          <Grid container wrap="nowrap" spacing={2} className={this.props.classes.root}>
            <SnackBar
              open={state.snackbar}
              type="info"
              message="Copied"
              onClose={() => this.setState({ snackbar: false })}
            ></SnackBar>
            <Grid item>
              <ChevronRightIcon className={this.props.classes.icon} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography className={this.props.classes.text} noWrap>
                {this.props.text}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      );
    if (this.props.type === "url")
      return (
        <Box
          onClick={() => analytics.track("Clicked URL", { url: this.props.text })}
          className={this.props.classes.box}
        >
          <Link href={this.props.text} target="blank" className={this.props.classes.box}>
            <Grid container wrap="nowrap" spacing={2} className={this.props.classes.containerUrl}>
              <Grid item>
                <LinkIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography className={this.props.classes.fatText} noWrap>
                  {this.props.text}
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </Box>
      );
  }
}

export default withStyles(styles)(ActionBox);
