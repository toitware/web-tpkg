import {
  AppBar as Bar,
  Button,
  createStyles,
  Divider,
  Grid,
  InputBase,
  Theme,
  Toolbar as MuiToolbar,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { History, UnregisterCallback } from "history";
import React from "react";
import { Link, Route, RouteComponentProps, withRouter } from "react-router-dom";
import { setTimeout } from "timers";
import { API_URL } from "../../App";
import { white } from "../../assets/theme/theme";
import { SearchIcon, ToitLogo, TpkgLogo } from "../../misc/icons";
import { Package } from "../ExploreView";
import ProgressBar from "../general/BorderLinearProgress";
import { getSearchString } from "../search/SearchView";
import ToolbarTop from "./ToolbarTop";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbarTop: {
      minHeight: 42,
      backgroundColor: theme.palette.primary.dark,
    },
    toolbarSmall: {
      height: 84,
      backgroundColor: theme.palette.primary.dark,
    },
    toolbarBig: {
      height: 276,
      backgroundColor: theme.palette.primary.dark,
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
      maxWidth: "90%",
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
      width: "90%",
      [theme.breakpoints.only("xs")]: {
        width: "60%",
      },
      [theme.breakpoints.only("sm")]: {
        width: "70%",
      },
      [theme.breakpoints.only("md")]: {
        width: "80%",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: 1032,
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
    button: {
      borderColor: white,
      borderStyle: "solid",
      borderWidth: 1,
      background: "transparent",
      color: white,
      width: 150,
      marginTop: theme.spacing(2),
      margin: theme.spacing(1),
    },
  });

interface AppBarProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
}
interface AppBarState {
  search?: string;
  loading: boolean;
  location: string;
  packages: Package[];
  store: Package[];
}

const landingPage = "/";

class AppBar extends React.PureComponent<AppBarProps, AppBarState> {
  unlisten?: UnregisterCallback = undefined;

  state = {
    search: getSearchString(),
    loading: false,
    location: "",
    packages: [],
    store: [] as Package[],
  };

  async componentDidMount() {
    console.log("State", this.state);
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({
        location: location.pathname,
      });
    });
    try {
      const response = await fetch(API_URL + "v1/packages");
      const text = await response.text();
      const split = await text.split("\n");
      const filter = await split.filter((line) => {
        return line !== "";
      });
      const map = await filter.map((line) => {
        return JSON.parse(line);
      });
      const lines = map as Package[];
      this.setState({ store: lines });
    } catch (error) {
      console.log("Error fetching", error);
    }
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async handleSearch() {
    analytics.ready(() => {
      analytics.track("Package Search", { search: this.state.search?.toLowerCase() });
    });
    this.props.history.push("/search?query=" + (this.state.search || ""));
  }

  render() {
    return this.props.history.location.pathname === landingPage || this.state.location === landingPage ? (
      <Bar color="secondary" position="absolute" elevation={0}>
        <ToolbarTop />
        <MuiToolbar className={this.props.classes.toolbarBig}>
          <Grid container direction="row">
            <Grid item xs={12} className={this.props.classes.tpkgLogo}>
              <Typography className={this.props.classes.title}>
                <Link to="/">
                  <TpkgLogo className={this.props.classes.logo} />
                </Link>
              </Typography>
            </Grid>
            <Grid container justifyContent="center" className={this.props.classes.tpkgContainer}>
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
                  onKeyPress={(en) => {
                    if (en.key === "Enter") {
                      en.preventDefault();
                      this.handleSearch().catch((e) => console.log(e));
                    }
                  }}
                />
              </div>
              <Route>
                <Button
                  className={this.props.classes.searchButton}
                  color="primary"
                  variant="contained"
                  onClick={() => this.handleSearch()}
                >
                  Search
                </Button>
              </Route>
            </Grid>
            <Grid container justifyContent="center">
              <Button component={Link} className={this.props.classes.button} to="/publish">
                Contribute
              </Button>
              <Button component={Link} className={this.props.classes.button} to="/packages">
                All packages
              </Button>
            </Grid>
          </Grid>
        </MuiToolbar>
        {this.state.loading !== false && <ProgressBar />}
      </Bar>
    ) : (
      <Bar color="secondary" position="absolute" elevation={0}>
        <ToolbarTop />
        <Divider className={this.props.classes.divider} />
        <MuiToolbar className={this.props.classes.toolbarSmall}>
          <Typography className={this.props.classes.title}>
            <Link to="/">
              <ToitLogo className={this.props.classes.logo} />
            </Link>
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
              type="search"
              value={this.state.search}
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => this.setState({ search: event.target.value })}
              onKeyPress={(en) => {
                if (en.key === "Enter") {
                  en.preventDefault();
                  this.handleSearch().catch((e) => console.log(e));
                }
              }}
            />
          </div>
          <Route>
            <Button
              className={this.props.classes.searchButton}
              color="primary"
              variant="contained"
              onClick={() => this.handleSearch()}
            >
              Search
            </Button>
          </Route>
        </MuiToolbar>
        {this.state.loading !== false && <ProgressBar />}
      </Bar>
    );
  }
}

export default withRouter(withStyles(styles)(AppBar));
