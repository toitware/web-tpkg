import {
  Button,
  CircularProgress,
  createStyles,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { ReactComponent as PackageFactory } from "../../assets/images/package-factory.svg";
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
      paddingTop: 0,
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        paddingTop: 126,
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
    heading: {
      paddingBottom: theme.spacing(3),
    },
    link: {
      marginTop: theme.spacing(2),
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
  state = {
    loading: false,
    error: "",
    version: "",
    url: "",
    snackbarOpen: false,
    snackbarText: "",
  };

  componentDidMount(): void {
    console.log(this.state.loading);
  }
  handleTextChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(name + " : " + event.target.value);
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
  };

  async publishPackage() {
    console.log("Publishing package...");
    this.setState({ snackbarOpen: true, snackbarText: "" });
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `https://pkg.infra.toit.io/api/v1/register/${this.state.url}/version/${this.state.url}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      console.log("response: ", response.ok);
      if (response.ok) {
        this.setState({ snackbarOpen: true, snackbarText: "Successfully published package" });
      }
    } catch (e) {
      let err = "";
      if (e instanceof Error) {
        err = `Error: ${e.message}`;
      }
      this.setState({ snackbarOpen: true, snackbarText: `Failed to publish. ${err}` });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12} md={6} className={this.props.classes.form}>
          <Typography variant="h3" className={this.props.classes.title}>
            Publish package
          </Typography>
          <Typography variant="body2" className={this.props.classes.description}>
            You contribute to the community by publishing your packages and help other IoT developers get going faster.
            Read more about how to publish a package at docs.toit.io. Thanks.
          </Typography>
          <InputLabel className={this.props.classes.formText}>Url*</InputLabel>
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
          <InputLabel className={this.props.classes.formText}>Version*</InputLabel>
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
          {this.state.error !== undefined && <FormHelperText error={true}>{this.state.error}</FormHelperText>}
          <div className={this.props.classes.buttonWrapper}>
            <Button
              type="submit"
              variant="contained"
              className={this.props.classes.button}
              color="primary"
              onClick={() => this.publishPackage()}
            >
              {!this.state.loading ? (
                "Publish"
              ) : (
                <CircularProgress color="secondary" size="16px" className={this.props.classes.circularProgress} />
              )}
            </Button>
          </div>
          <Typography variant="body2" className={this.props.classes.terms}>
            Your Github repository has to be public to successfully be able to publish a pack- age to the Toit package
            registry. Your package will be validated by the Toit team and this is only done in order to avoid having
            packages that are potential harmful.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className={this.props.classes.packageFactory}>
          <PackageFactory />
        </Grid>
        <SnackBar
          message={this.state.snackbarText}
          open={this.state.snackbarOpen}
          type="info"
          onClose={() => this.setState({ snackbarOpen: false })}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(PublishView);
