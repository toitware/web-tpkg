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
import { Dependency, Version } from "./DependenciesView";
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

interface PackageRaw {
  name: string;
  description: string;
  license: string;
  url: string;
  version: string;
  dependencies: Dependency[];
}

interface PackageState {
  snackbar: boolean;
  pkgs: Version[];
  package: PackageRaw;
  loading: boolean;
  version: string;
}

class PackageView extends React.Component<PackageProps, PackageState> {
  async componentDidMount() {
    this.setState({
      loading: true,
      snackbar: false,
      pkgs: [] as Version[],
      version: "",
      package: {} as PackageRaw,
    });
    const pathName = this.props.history.location.pathname;
    const url = pathName.split("package/")[1];
    const urlWithoutVersion = url.split("@v")[0];
    const version = url.split("@v")[1];
    let pkg = {} as Version;
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
      const lines = map as Version[];

      lines.forEach((val: Version) => {
        if (val.result.version.version === version) {
          pkg = val;
        }
      });
      if (!pkg.result) pkg = lines[lines.length - 1];
      this.setState({ pkgs: lines });
    } catch (error) {
      console.log("Error fetching", error);
    }
    this.setState({
      package: {
        name: pkg.result.version.name,
        description: pkg.result.version.description,
        license: pkg.result.version.license,
        url: pkg.result.version.url,
        version: pkg.result.version.version,
        dependencies: pkg.result.version.dependencies,
      },
    });
    this.setState({ loading: false });
  }

  handleCopyInstallationText(text: string) {
    void navigator.clipboard.writeText(text);
    this.setState({ snackbar: true });
  }

  render() {
    const state: PackageState = this.state || {};
    return (
      !state.loading && (
        <>
          <Grid container className={this.props.classes.grid}>
            <Grid item xs={12}>
              <Typography variant="h4" className={this.props.classes.title}>
                {state.package?.name}
              </Typography>
              <PackageLineDetails version={state.package?.version} published={Date.now()} url={state.package?.url} />
              <Grid container className={this.props.classes.content}>
                <Grid item xs={12} md={8}>
                  <PackageMenuView pkgs={state.pkgs} />
                </Grid>

                <Grid item xs={12} md={4} className={this.props.classes.sideInfo}>
                  <Grid item className={this.props.classes.sideInfoContent}>
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Grid item xs={6}>
                        <Typography className={this.props.classes.bold}>License</Typography>
                        <Typography variant="body2">{state.package?.license}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={this.props.classes.bold}>Version</Typography>
                        <Typography variant="body2">{state.package?.version}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Typography className={this.props.classes.bold}>Repository</Typography>
                      <Grid container direction="row">
                        <ActionBox text={"https://" + state.package?.url} type="url" />
                      </Grid>
                    </Grid>
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Typography className={this.props.classes.bold}>Documentation</Typography>
                      <Grid container direction="row">
                        {state.package && (
                          <ActionBox
                            text={new URL(
                              process.env.REACT_APP_DOMAIN + `${state.package?.url}@${state.package?.version}/docs/`,
                              window.location.href
                            ).toString()}
                            type="url"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <SnackBar
              message="Text copied"
              type="success"
              open={state.snackbar}
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
