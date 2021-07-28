import { createStyles, CssBaseline, Theme, withStyles, WithStyles } from "@material-ui/core";
import { History, UnregisterCallback } from "history";
import React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { dividerGrey, selected, white } from "../assets/theme/theme";
import AppBar from "./AppBar";
import ExploreView, { Package } from "./ExploreView";
import PackageView from "./package/PackageView";
import RegisterView from "./publish/PublishView";
import SearchView, { http } from "./Search/SearchView";
import WelcomeView from "./WelcomeView";

const screenWidth = 1000;
const gridSpacing = 8;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginTop: theme.spacing(8),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      [theme.breakpoints.up("md")]: {
        marginLeft: `calc((100% - ${screenWidth}px)/2)`,
        marginRight: `calc((100% - ${screenWidth}px)/2)`,
      },
    },
    appBar: {
      color: theme.palette.primary.main,
      // transition: theme.transitions.create(["margin", "width"], {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
      zIndex: 0,
      backgroundColor: white,
      borderBottomWidth: "1px",
      borderBottomColor: dividerGrey,
      borderBottomStyle: "solid",
    },
    logo: {
      marginLeft: "13px",
      height: "1rem",
    },
    menuButton: {
      position: "absolute",
      right: theme.spacing(1.5),
      padding: 0,
    },
    menuExpandButton: {
      padding: 0,
      marginRight: theme.spacing(1.25),
    },
    hide: {
      display: "none",
    },
    toolbar: {},
    appBarContent: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: gridSpacing / 2,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      width: "calc(100% - " + 0 + "px)",
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    title: {
      flexGrow: 1,
    },
    typography: {
      padding: theme.spacing(3),
    },
    button: {
      color: theme.palette.common.black,
    },
    appBarRight: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    exitButton: {
      color: theme.palette.common.black,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    list: {
      overflowX: "hidden",
      overflow: "auto",
    },
    listItem: {
      "&:hover, &.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: selected,
      },
    },
    icon: {
      color: "black",
    },
    orgNameAndHelp: {
      display: "flex",
      alignItems: "center",
    },
  });

interface MainProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
}

interface MenuState {
  location: string;
  packages: Package[];
  filteredPackages: Package[];
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

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({
        location: location.pathname,
      });
      //analytics.page();
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
        <CssBaseline />
        <AppBar callback={(p: Package[]) => this.handleCallback(p)} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {this.pages.map((page, index) => (
              <Route key={index} path={page.routepath} exact={page.exact} render={page.render} />
            ))}
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(MainView));
