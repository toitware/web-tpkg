import { ButtonBase, createStyles, Grid, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { goldenShade, tigerShade } from "../assets/theme/theme";
import { CopyIcon } from "../misc/icons";
import PackageLineDetails from "./general/PackageLineDetails";
import { SnackBar } from "./general/SnackBar";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    title: {
      paddingTop: theme.spacing(7.5),
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
    },
    installationLine: {
      justifyContent: "space-between",
    },
  });

type PackageProps = WithStyles<typeof styles>;

interface PackageState {
  snackbar: boolean;
}

class PackageView extends React.Component<PackageProps, PackageState> {
  state = {
    snackbar: false,
  };

  componentDidMount() {
    //todo: fetch https://pkg.infra.toit.io/api/v1/packages/github.com/toitware/toit-morse/versions
  }
  installationText = "toit pkg install toit-morse";

  handleCopyInstallationText(text: string) {
    void navigator.clipboard.writeText(text);
    this.setState({ snackbar: true });
  }

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h4" className={this.props.classes.title}>
            toit-morse
          </Typography>
          <PackageLineDetails version="1.0.1" access="public" published={Date.now()} />
          <Grid container>
            <Grid item xs={8}>
              <Typography>What yo</Typography>
            </Grid>

            <Grid item xs={4} className={this.props.classes.sideInfo} spacing={2}>
              <Grid item className={this.props.classes.sideInfoContent}>
                <Typography className={this.props.classes.bold}>Installation</Typography>
                <Grid container direction="row" className={this.props.classes.installationLine}>
                  <Typography className={this.props.classes.install}>{this.installationText}</Typography>
                  <ButtonBase onClick={() => this.handleCopyInstallationText("toit pkg install toit-morse")}>
                    <CopyIcon />
                  </ButtonBase>
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
    );
  }
}

export default withStyles(styles)(PackageView);
