import {
  Button,
  CircularProgress,
  createStyles,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { API_URL } from "../../App";
import { ReactComponent as PackageFactory } from "../../assets/images/package-factory.svg";
import { tiger } from "../../assets/theme/theme";
import Footer, { footerHeight } from "../general/Footer";
import { SnackBar } from "../general/SnackBar";

const BlackBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: black;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: black;
    }
    fieldset {
      border-color: black;
    }
  }
`;

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      paddingTop: 126,
      paddingBottom: footerHeight + 120,
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    buttonWrapper: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    button: {
      minWidth: 100,
    },
    textField: {
      borderColor: theme.palette.primary.dark,
      marginBottom: theme.spacing(4),
    },
    formText: {
      fontFamily: "ClashDisplay-medium",
      fontSize: 18,
      color: theme.palette.primary.dark,
      marginBottom: -12,
      display: "flex",
      placeItems: "flex-end",
    },
    description: {
      marginBottom: theme.spacing(3),
    },
    packageFactory: {
      textAlign: "center",
      overflowX: "hidden",
    },
    terms: {
      marginTop: theme.spacing(2),
      fontSize: 12,
      fontFamily: "roboto",
      fontStyle: "italic",
    },
    form: {
      [theme.breakpoints.down("sm")]: {
        maxWidth: "400px",
      },
    },
    circularProgress: {
      margin: 4,
      marginLeft: 15,
      marginRight: 15,
    },
    star: {
      color: tiger,
    },
    commandText: {
      fontWeight: 500,
      fontStyle: "italic",
      fontSize: 12,
    },
  });

type PublishProps = WithStyles<typeof styles>;

interface PublishState {
  loading: boolean;
  error?: string;
  version: string;
  url: string;
  snackbarOpen: boolean;
  snackbarText: string;
}

class PublishView extends React.Component<PublishProps, PublishState> {
  state: PublishState = {
    loading: false,
    url: "",
    version: "",
    snackbarOpen: false,
    snackbarText: "",
  };

  handleTextChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
  };

  async publishPackage() {
    this.setState({ snackbarOpen: false, snackbarText: "", loading: true });
    let url = this.state.url;
    if (url.startsWith("https://")) {
      url = url.substring(8);
    } else if (url.startsWith("http://")) {
      url = url.substring(7);
    }

    try {
      const response = await fetch(API_URL + `v1/register/${url}/version/${this.state.version}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        analytics.track("Published Package Successfully", { url: url, tag: this.state.version });
      } else {
        let err = response.statusText;
        try {
          const body = await response.text();
          const msg = JSON.parse(body) as { message?: string };
          err = msg.message || err;
        } finally {
          throw err;
        }
      }

      this.setState({ snackbarOpen: true, snackbarText: "Successfully published package" });
    } catch (e) {
      let err = "" + e;
      if (e instanceof Error) {
        analytics.track("Published Package Failed", { url: url, tag: this.state.version });
        err = `Error: ${e.message}`;
      }
      this.setState({ snackbarOpen: true, snackbarText: `Failed to publish. ${err}` });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const state: PublishState = this.state || {};
    return (
      <>
        <Grid container className={this.props.classes.grid}>
          <Grid item xs={12} md={6} className={this.props.classes.form}>
            <Typography variant="h2" className={this.props.classes.title}>
              Publish package
            </Typography>
            <Typography variant="body2" className={this.props.classes.description}>
              You contribute to the community by publishing your packages and help other IoT developers get going
              faster. Learn how to write a package at{" "}
              <Link href="https://docs.toit.io/language/package/pkgtutorial">docs.toit.io</Link>. Thanks.
            </Typography>
            <InputLabel className={this.props.classes.formText}>
              Git URL<Typography className={this.props.classes.star}>*</Typography>
            </InputLabel>
            <BlackBorderTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="url"
              name="url"
              onChange={this.handleTextChange("url")}
              autoComplete="url"
              autoFocus
              size="small"
              className={this.props.classes.textField}
            />
            <InputLabel className={this.props.classes.formText}>
              Git tag<Typography className={this.props.classes.star}>*</Typography>
            </InputLabel>
            <BlackBorderTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="version"
              name="version"
              onChange={this.handleTextChange("version")}
              autoComplete="version"
              size="small"
              className={this.props.classes.textField}
            />
            {state.error !== undefined && <FormHelperText error={true}>{state.error}</FormHelperText>}
            <div className={this.props.classes.buttonWrapper}>
              <Button
                type="submit"
                variant="contained"
                className={this.props.classes.button}
                color="primary"
                disabled={state.version === "" || state.url === ""}
                onClick={() => this.publishPackage()}
              >
                {!state.loading ? (
                  "Publish"
                ) : (
                  <CircularProgress color="secondary" size="16px" className={this.props.classes.circularProgress} />
                )}
              </Button>
            </div>
            <Typography display="inline" className={this.props.classes.terms}>
              Your Git repository (GitHub, GitLab or other) has to be public to successfully be able to publish a
              package to the Toit package registry. To make sure the information is correct before publishing, execute
              the following command{" "}
            </Typography>
            <Typography display="inline" className={this.props.classes.commandText}>
              {" "}
              toit pkg describe YOUR_URL YOUR_TAG.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} className={this.props.classes.packageFactory}>
            <PackageFactory width="100%" />
          </Grid>
          <SnackBar
            message={state.snackbarText}
            open={state.snackbarOpen}
            type="info"
            onClose={() => this.setState({ snackbarOpen: false })}
          />
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles)(PublishView);
