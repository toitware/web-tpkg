import {
  AppBar,
  Box,
  createStyles,
  Grid,
  Tab,
  Tabs,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";
import {
  dart,
  dartShade,
  golden,
  goldenShade,
  passion,
  passionShade,
  python,
  pythonShade,
} from "../../assets/theme/theme";
import { FileTextIcon, PackageIcon, StarIcon, TagIcon } from "../../misc/icons";
import DependenciesView from "./DependenciesView";
import ReadmeView from "./ReadmeView";
import VersionsView from "./VersionsView";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
    },
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    menuIcon: {
      verticalAlign: "middle",
      marginRight: 4,
    },
    tabReadme: {
      "&.Mui-selected": {
        backgroundColor: goldenShade,
      },
    },
    tabDependencies: {
      "&.Mui-selected": {
        backgroundColor: pythonShade,
      },
    },
    tabVersions: {
      "&.Mui-selected": {
        backgroundColor: dartShade,
      },
    },
    tabScores: {
      "&.Mui-selected": {
        backgroundColor: passionShade,
      },
    },
  });

interface PackageMenuProps extends WithStyles<typeof styles> {
  searchQuery?: string;
}

interface PackageMenuState {
  menuValue: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

class PackageMenuView extends React.Component<PackageMenuProps, PackageMenuState> {
  state = {
    menuValue: 0,
  };

  componentDidMount() {}

  onTabChange = (event: React.ChangeEvent<unknown>, newValue: number): void => {
    this.setState({ menuValue: newValue });
  };

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <div className={this.props.classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.menuValue}
              onChange={this.onTabChange}
              variant="standard"
              scrollButtons="off"
              indicatorColor="primary"
              textColor="primary"
              aria-label="package menu"
              TabIndicatorProps={{
                style: {
                  backgroundColor:
                    this.state.menuValue === 0
                      ? golden
                      : this.state.menuValue === 1
                      ? python
                      : this.state.menuValue === 2
                      ? dart
                      : passion,
                  height: 4,
                },
              }}
            >
              <Tab
                label={
                  <>
                    <div>
                      <FileTextIcon className={this.props.classes.menuIcon} />
                      Readme
                    </div>
                  </>
                }
                {...a11yProps(1)}
                className={this.props.classes.tabReadme}
              />
              <Tab
                label={
                  <>
                    <div>
                      <PackageIcon className={this.props.classes.menuIcon} />
                      Dependecies
                    </div>
                  </>
                }
                {...a11yProps(2)}
                className={this.props.classes.tabDependencies}
              />
              <Tab
                label={
                  <>
                    <div>
                      <TagIcon className={this.props.classes.menuIcon} />
                      Versions
                    </div>
                  </>
                }
                {...a11yProps(3)}
                className={this.props.classes.tabVersions}
              />
              <Tab
                label={
                  <>
                    <div>
                      <StarIcon className={this.props.classes.menuIcon} />
                      Scores
                    </div>
                  </>
                }
                {...a11yProps(4)}
                className={this.props.classes.tabScores}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.menuValue} index={0}>
            <ReadmeView />
          </TabPanel>
          <TabPanel value={this.state.menuValue} index={1}>
            <DependenciesView />
          </TabPanel>
          <TabPanel value={this.state.menuValue} index={2}>
            <VersionsView />
          </TabPanel>
          <TabPanel value={this.state.menuValue} index={3}>
            Item Four
          </TabPanel>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(PackageMenuView);
