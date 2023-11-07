// Copyright (C) 2023 Toitware ApS. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import { createStyles, Grid, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { API_URL } from "../../App";
import { goldenShade, tigerShade } from "../../assets/theme/theme";
import Footer, { footerHeight } from "../general/Footer";
import PackageLineDetails from "../general/PackageLineDetails";
import { SnackBar } from "../general/SnackBar";
import ActionBox from "./ActionBox";
import { Version, Package } from "./DependenciesView";
import PackageMenuView from "./PackageMenuView";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      paddingTop: 123,
      paddingBottom: footerHeight + 120,
    },
    title: {
      textDecorationColor: goldenShade,
      textDecorationLine: "underline",
      textDecorationThickness: 4,
      textUnderlineOffset: "-0.05em",
    },
    sideInfo: {
      backgroundColor: tigerShade,
      minHeight: 254,
    },
    sideInfoContent: {
      padding: theme.spacing(3),
    },
    bold: {
      fontWeight: 600,
    },
    install: {
      fontFamily: "Roboto Mono",
      fontWeight: 400,
      fontSize: 14,
      maxWidth: 260,
    },
    installationLine: {
      justifyContent: "space-between",
      lineBreak: "anywhere",
    },
    textContainer: {
      marginBottom: theme.spacing(2),
    },
    content: {
      marginTop: theme.spacing(6),
    },
  });

interface PackageProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
}

interface PackageState {
  snackbar: boolean;
  pkgs?: Version[];
  currentPkgIndex?: number;
  version: string;
}

class PackageView extends React.Component<PackageProps, PackageState> {
  state: PackageState = {
    snackbar: false,
    pkgs: undefined,
    currentPkgIndex: undefined,
    version: "",
  };

  async componentDidMount() {
    const pathName = this.props.history.location.pathname;
    const url = pathName.split("package/")[1];
    const urlWithoutVersion = url.split("@v")[0];
    const version = url.split("@v")[1];
    try {
      const responseVersions = await fetch(API_URL + "v1/packages/" + urlWithoutVersion + "/versions");
      const text = await responseVersions.text();
      const split = await text.split("\n");
      const filter = await split.filter((line) => {
        return line !== "";
      });
      const map = await filter.map((line) => {
        return JSON.parse(line);
      });
      const pkgs = map as Version[];
      let currentPkgIndex = undefined;
      pkgs.forEach((val: Version, idx: number) => {
        if (val.result.version.version === version) {
          currentPkgIndex = idx;
        }
      });

      this.setState({
        pkgs: pkgs,
        currentPkgIndex: currentPkgIndex,
      });
    } catch (error) {
      console.log("Error fetching", error);
    }
  }

  handleCopyInstallationText(text: string) {
    void navigator.clipboard.writeText(text);
    this.setState({ snackbar: true });
  }

  render() {
    let pkg: Package | undefined = undefined;
    // If we didn't find the version default to latest.
    const currentPkgIndex =
      this.state.currentPkgIndex !== undefined ? this.state.currentPkgIndex : (this.state.pkgs?.length || 0) - 1;
    if (this.state.pkgs !== undefined) {
      pkg = this.state.pkgs[currentPkgIndex].result.version;
    }
    return (
      pkg !== undefined && (
        <>
          <Grid container className={this.props.classes.grid}>
            <Grid item xs={12}>
              <Typography variant="h4" className={this.props.classes.title}>
                {pkg.name}
              </Typography>
              <PackageLineDetails version={pkg.version} published={Date.now()} url={pkg.url} />
              <Grid container className={this.props.classes.content}>
                <Grid item xs={12} md={8}>
                  <PackageMenuView pkgs={this.state.pkgs || []} currentPkgIndex={currentPkgIndex} />
                </Grid>

                <Grid item xs={12} md={4} className={this.props.classes.sideInfo}>
                  <Grid item className={this.props.classes.sideInfoContent}>
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Grid item xs={6}>
                        <Typography className={this.props.classes.bold}>License</Typography>
                        <Typography variant="body2">{pkg.license}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={this.props.classes.bold}>Version</Typography>
                        <Typography variant="body2">{pkg.version}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Typography className={this.props.classes.bold}>Repository</Typography>
                      <Grid container direction="row">
                        <ActionBox text={"https://" + pkg.url} type="url" />
                      </Grid>
                    </Grid>
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Typography className={this.props.classes.bold}>Documentation</Typography>
                      <Grid container direction="row">
                        <ActionBox
                          text={new URL(
                            process.env.REACT_APP_DOMAIN + `${pkg.url}@${pkg.version}/docs/`,
                            window.location.href
                          ).toString()}
                          type="url"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <SnackBar
              message="Text copied"
              type="success"
              open={this.state.snackbar}
              onClose={() => this.setState({ snackbar: false })}
            ></SnackBar>
          </Grid>
          <Footer />
        </>
      )
    );
  }
}

export default withRouter(withStyles(styles)(PackageView));
