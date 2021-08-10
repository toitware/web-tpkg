import { ButtonBase, createStyles, Grid, Theme, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { CopyIcon } from "../../misc/icons";
import { SnackBar } from "../general/SnackBar";
import { Version } from "./DependenciesView";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    description: {
      paddingTop: theme.spacing(2),
    },
    installation: {
      paddingTop: theme.spacing(2),
    },
    install: {
      fontFamily: "Roboto Mono",
      fontWeight: 400,
      fontSize: 14,
      paddingRight: theme.spacing(2),
    },
    installationLine: {
      lineBreak: "anywhere",
    },
  });

interface InstallationProps extends WithStyles<typeof styles> {
  pkg: Version;
}

class InstallationView extends React.Component<InstallationProps> {
  state = {
    snackbar: false,
  };

  handleCopyInstallationText(text: string) {
    void navigator.clipboard.writeText(text);
    this.setState({ snackbar: true });
  }

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h2">{this.props.pkg.result.version.name}</Typography>
        </Grid>
        <Grid item xs={12} className={this.props.classes.description}>
          <Typography variant="h5">Description</Typography>
          <Typography>{this.props.pkg.result.version.description}</Typography>
        </Grid>
        <Grid item xs={12} className={this.props.classes.description}>
          <Typography variant="h5">Installation</Typography>
          <Grid container direction="row" className={this.props.classes.installationLine}>
            <Typography className={this.props.classes.install}>
              {`toit pkg install ${this.props.pkg.result.version.name}`}
            </Typography>
            <ButtonBase
              onClick={() => this.handleCopyInstallationText(`toit pkg install ${this.props.pkg.result.version.name}`)}
            >
              <CopyIcon />
            </ButtonBase>
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

export default withStyles(styles)(InstallationView);
