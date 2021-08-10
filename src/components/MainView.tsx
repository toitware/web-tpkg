import { createStyles, CssBaseline, Theme, withStyles, WithStyles } from "@material-ui/core";
import { History, UnregisterCallback } from "history";
import React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { dividerGrey } from "../assets/theme/theme";
import ExploreView, { Package } from "./ExploreView";
import AppBar from "./header/AppBar";
import PackageView from "./package/PackageView";
import RegisterView from "./publish/PublishView";
import SearchView, { API_URL_PACKAGES, http } from "./search/SearchView";
import WelcomeView from "./WelcomeView";

export const screenWidth = 1000;
const gridSpacing = 8;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      position: "relative",
    },
    container: {
      display: "flex",
      paddingTop: theme.spacing(8),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      [theme.breakpoints.up("md")]: {
        marginLeft: `calc((100% - ${screenWidth}px)/2)`,
        marginRight: `calc((100% - ${screenWidth}px)/2)`,
      },
      [theme.breakpoints.only("xs")]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      flexDirection: "column",
    },
    appBar: {
      color: theme.palette.primary.main,
      // transition: theme.transitions.create(["margin", "width"], {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
      zIndex: 0,
      backgroundColor: "transparent",
      borderBottomWidth: "1px",
      borderBottomColor: dividerGrey,
      borderBottomStyle: "solid",
    },
    content: {
      flexGrow: 1,
      backgroundColor: "transparent",
      padding: gridSpacing / 2,
      display: "flex",
      flexDirection: "column",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      width: "calc(100% - " + 0 + "px)",
    },
  });

interface MainProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
}

interface MenuState {
  location: string;
  packages: Package[];
  filteredPackages: Package[];
  loading: boolean;
}

interface PageComponent {
  name: string;
  routepath: string;
  linkpath: string;
  exact: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (props: RouteComponentProps<any>) => React.ReactNode;
}

class MainView extends React.Component<MainProps, MenuState> {
  unlisten?: UnregisterCallback = undefined;
  state = {
    location: "",
    packages: [],
    filteredPackages: [],
    loading: true,
  };

  setLoading(loading: boolean) {
    this.setState({
      loading: loading,
    });
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({
        location: location.pathname,
      });
    });

    () =>
      http(API_URL_PACKAGES)
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
              return JSON.parse(line) as Package;
            });
        })
        .then((lines) => {
          this.setState({ packages: lines });
        })
        .catch((reason) => {
          console.log(reason);
        });
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  pages: PageComponent[] = [
    {
      name: "Welcome",
      routepath: "/",
      linkpath: "",
      exact: true,
      render: () => <WelcomeView />,
    },
    {
      name: "Packages",
      routepath: "/packages",
      linkpath: "",
      exact: true,
      render: (routeProps) => <ExploreView packages={this.state.packages} {...routeProps} />,
    },
    {
      name: "Package",
      routepath: "/package/:packageName?",
      linkpath: "",
      exact: true,
      render: () => <PackageView />,
    },
    {
      name: "Search",
      routepath: "/search/:searchQuery?",
      linkpath: "",
      exact: true,
      render: () => <SearchView packages={this.state.filteredPackages} />,
    },
    {
      name: "Register",
      routepath: "/register",
      linkpath: "",
      exact: true,
      render: () => <RegisterView />,
    },
  ];

  handleCallback(pkgs: Package[]) {
    this.setState({ filteredPackages: pkgs });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <CssBaseline />
          <AppBar callback={(p: Package[]) => this.handleCallback(p)} />
          {!this.state.loading && (
            <main className={classes.content}>
              <div />
              <Switch>
                {this.pages.map((page, index) => (
                  <Route key={index} path={page.routepath} exact={page.exact} render={page.render} />
                ))}
              </Switch>
            </main>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(MainView));
