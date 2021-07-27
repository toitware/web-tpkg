import {
  AppBar as Bar,
  Button,
  createStyles,
  Divider,
  Grid,
  InputBase,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { History, UnregisterCallback } from "history";
import React from "react";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import PackagesTestFile from "../data/packages.json";
import { SearchIcon, ToitLogo, TpkgLogo } from "../misc/icons";
import { Package } from "./ExploreView";
import ProgressBar from "./general/BorderLinearProgress";
import { http } from "./Search/SearchView";

const index = 5;
const store = PackagesTestFile;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbarTop: {
      minHeight: 42,
      backgroundColor: theme.palette.primary.dark,
    },
    toolbarBottom: {
      height: 84,
      backgroundColor: theme.palette.primary.dark,
    },
    toolbarBottomTpkg: {
      height: 276,
      backgroundColor: theme.palette.primary.dark,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.light,
      marginLeft: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(4),
        width: "100%",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      borderWidth: 1,
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
      borderColor: theme.palette.primary.light,
      borderStyle: "solid",
      height: "42px",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
    inputInputTpkg: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create("width"),
      width: "100%",
    },
    searchButton: {
      height: 42,
      borderRadius: 0,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
      borderWidth: 1,
      borderColor: theme.palette.primary.light,
      borderStyle: "solid",
      width: 80,
      [theme.breakpoints.up("sm")]: {
        width: 160,
      },
    },
    logo: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    tpkgLogo: {
      textAlign: "center",
    },
    divider: {
      backgroundColor: theme.palette.primary.light,
    },
    searchTpkg: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      height: 42,
      backgroundColor: theme.palette.primary.light,
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        maxWidth: 900,
      },
    },
    searchIconTpkg: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    tpkgContainer: {
      display: "inline-flex",
    },
  });

interface AppBarProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
}
interface AppBarState {
  search: string;
  loading: boolean;
  location: string;
  packages: Package[];
}

const landingPage = "/";

class AppBar extends React.PureComponent<AppBarProps, AppBarState> {
  unlisten?: UnregisterCallback = undefined;

  state = {
    search: "",
    loading: false,
    location: "",
    packages: [],
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({
        location: location.pathname,
      });
    });
    http("http://localhost:8733/api/v1/packages")
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        return response
          .split("\n")
          .filter((line) => {
            return line != "";
          })
          .map((line) => {
            return JSON.parse(line) as Package;
          });
      })
      .then((lines) => {
        this.setState({ packages: lines });
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  componentDidUpdate() {
    console.log("Current page:", this.state.location);
  }

  render() {
    return this.props.history.location.pathname === landingPage || this.state.location === landingPage ? (
      <Bar color="secondary" position="absolute">
        <Toolbar className={this.props.classes.toolbarTop}>
          <Typography variant="h6" className={this.props.classes.title}>
            {" "}
          </Typography>
          <Button color="secondary" href="https://toit.io" target="blank">
            Website
          </Button>
          <Button color="secondary" href="https://console.toit.io" target="blank">
            Console
          </Button>
          <Button color="secondary" href="https://docs.toit.io" target="blank">
            Documentation
          </Button>
          <Button color="secondary" href="https://libs.toit.io" target="blank">
            Library
          </Button>
          <Button color="secondary" href="https://chat.toit.io" target="blank">
            Community
          </Button>
        </Toolbar>
        <Toolbar className={this.props.classes.toolbarBottomTpkg}>
          <Grid container direction="row">
            <Grid item xs={12} className={this.props.classes.tpkgLogo}>
              <Typography className={this.props.classes.title}>
                <TpkgLogo className={this.props.classes.logo} onClick={() => this.props.history.push("/")} />
              </Typography>
            </Grid>
            <Grid item xs={12} justifyContent="center" className={this.props.classes.tpkgContainer}>
              <div className={this.props.classes.searchTpkg}>
                <div className={this.props.classes.searchIconTpkg}>
                  <SearchIcon />
                </div>
                <InputBase
                  fullWidth
                  placeholder="Search…"
                  classes={{
                    root: this.props.classes.inputRoot,
                    input: this.props.classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => this.setState({ search: event.target.value })}
                />
              </div>
              <Route>
                <Button
                  className={this.props.classes.searchButton}
                  color="primary"
                  variant="contained"
                  onClick={() => this.props.history.push("/search?query=" + this.state.search)}
                >
                  Search
                </Button>
              </Route>
            </Grid>
          </Grid>
        </Toolbar>
        {this.state.loading !== false && <ProgressBar />}
      </Bar>
    ) : (
      <Bar color="secondary" position="absolute">
        <Toolbar className={this.props.classes.toolbarTop}>
          <Typography variant="h6" className={this.props.classes.title}>
            {" "}
          </Typography>
          <Button color="secondary" href="https://toit.io" target="blank">
            Website
          </Button>
          <Button color="secondary" href="https://console.toit.io" target="blank">
            Console
          </Button>
          <Button color="secondary" href="https://docs.toit.io" target="blank">
            Documentation
          </Button>
          <Button color="secondary" href="https://libs.toit.io" target="blank">
            Library
          </Button>
          <Button color="secondary" href="https://slack.toit.io" target="blank">
            Community
          </Button>
        </Toolbar>
        <Divider className={this.props.classes.divider} />
        <Toolbar className={this.props.classes.toolbarBottom}>
          <Typography className={this.props.classes.title}>
            <ToitLogo className={this.props.classes.logo} onClick={() => this.props.history.push("/")} />
          </Typography>
          <div className={this.props.classes.search}>
            <div className={this.props.classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              fullWidth
              placeholder="Search…"
              classes={{
                root: this.props.classes.inputRoot,
                input: this.props.classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => this.setState({ search: event.target.value })}
            />
          </div>
          <Route>
            <Button
              className={this.props.classes.searchButton}
              color="primary"
              variant="contained"
              onClick={() => this.props.history.push("/search?query=" + this.state.search)}
            >
              Search
            </Button>
          </Route>
        </Toolbar>
        {this.state.loading !== false && <ProgressBar />}
      </Bar>
    );
  }
}

export default withRouter(withStyles(styles)(AppBar));
