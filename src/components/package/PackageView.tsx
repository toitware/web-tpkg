import { ButtonBase, createStyles, Grid, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { goldenShade, tigerShade } from "../../assets/theme/theme";
import { ExternalLinkIcon } from "../../misc/icons";
import Footer, { footerHeight } from "../general/Footer";
import PackageLineDetails from "../general/PackageLineDetails";
import { SnackBar } from "../general/SnackBar";
import { http } from "../search/SearchView";
import { Version } from "./DependenciesView";
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
  pkgs: Version[];
  loading: boolean;
}

class PackageView extends React.Component<PackageProps, PackageState> {
  state = {
    snackbar: false,
    pkgs: [] as Version[],
    loading: true,
  };
  componentDidMount() {
    this.setState({ loading: true });
    const pathName = this.props.history.location.pathname;
    const url = pathName.split("url=")[1];
    http(`http://localhost:8733/api/v1/packages/${url}/versions`)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        return response
          .split("\n")
          .filter((line) => {
            return line !== "";
          })
          .map((line) => {
            return JSON.parse(line) as Version;
          });
      })
      .then((lines) => {
        this.setState({ pkgs: lines });
      })
      .catch((reason) => {
        console.log(reason);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleCopyInstallationText(text: string) {
    void navigator.clipboard.writeText(text);
    this.setState({ snackbar: true });
  }

  render() {
    return (
      !this.state.loading && (
        <>
          <Grid container className={this.props.classes.grid}>
            <Grid item xs={12}>
              <Typography variant="h4" className={this.props.classes.title}>
                {this.state.pkgs[this.state.pkgs.length - 1].result.version.name}
              </Typography>
              <PackageLineDetails
                version={this.state.pkgs[this.state.pkgs.length - 1].result.version.version}
                published={Date.now()}
              />
              <Grid container className={this.props.classes.content}>
                <Grid item xs={12} md={8}>
                  <PackageMenuView pkgs={this.state.pkgs} />
                </Grid>

                <Grid item xs={12} md={4} className={this.props.classes.sideInfo}>
                  <Grid item className={this.props.classes.sideInfoContent}>
                    {/* 
                    
                    
                    <Typography className={this.props.classes.bold}>Installation</Typography>
                    <Grid container direction="row" className={this.props.classes.installationLine}>
                      <Typography className={this.props.classes.install}>
                        {`toit pkg install ${this.state.pkgs[this.state.pkgs.length - 1].result.version.name}`}
                      </Typography>
                      <ButtonBase
                        onClick={() =>
                          this.handleCopyInstallationText(
                            `toit pkg install ${this.state.pkgs[this.state.pkgs.length - 1].result.version.name}`
                          )
                        }
                      >
                        <CopyIcon />
                      </ButtonBase>
                    </Grid>
                          */}
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Grid item xs={6}>
                        <Typography className={this.props.classes.bold}>License</Typography>
                        <Typography variant="body2">
                          {this.state.pkgs[this.state.pkgs.length - 1].result.version.license}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={this.props.classes.bold}>Version</Typography>
                        <Typography variant="body2">
                          {this.state.pkgs[this.state.pkgs.length - 1].result.version.version}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Typography className={this.props.classes.bold}>Repository</Typography>
                      <Grid container direction="row" className={this.props.classes.installationLine}>
                        <Typography className={this.props.classes.install}>
                          {this.state.pkgs[this.state.pkgs.length - 1].result.version.url}
                        </Typography>
                        <ButtonBase
                          onClick={() =>
                            window.open("https://" + this.state.pkgs[this.state.pkgs.length - 1].result.version.url)
                          }
                        >
                          <ExternalLinkIcon />
                        </ButtonBase>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" className={this.props.classes.textContainer}>
                      <Typography className={this.props.classes.bold}>Documentation</Typography>
                      <Grid container direction="row" className={this.props.classes.installationLine}>
                        <Typography className={this.props.classes.install}>{`pkg.toit.io/packages/${
                          this.state.pkgs[this.state.pkgs.length - 1].result.version.name
                        }`}</Typography>
                        <ButtonBase
                          onClick={() =>
                            window.open(
                              `https://pkg.infra.toit.io/${
                                this.state.pkgs[this.state.pkgs.length - 1].result.version.url
                              }@${this.state.pkgs[this.state.pkgs.length - 1].result.version.version}/docs/${
                                this.state.pkgs[this.state.pkgs.length - 1].result.version.name
                              }/library-summary`
                            )
                          }
                        >
                          <ExternalLinkIcon />
                        </ButtonBase>
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
