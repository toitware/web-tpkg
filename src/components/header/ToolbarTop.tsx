import {
  Button,
  createStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar as MuiToolbar,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import withWidth, { isWidthDown, WithWidth } from "@material-ui/core/withWidth";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { MenuIcon } from "../../misc/icons";

const styles = (theme: Theme) =>
  createStyles({
    toolbarTop: {
      minHeight: 42,
      backgroundColor: theme.palette.primary.dark,
    },
    toolbarBottom: {
      height: 84,
      backgroundColor: theme.palette.primary.dark,
    },
    title: {
      flexGrow: 1,
    },
  });

interface ToolbarTopProps extends WithStyles<typeof styles>, WithWidth, RouteComponentProps {
  history: History;
}

interface ToolbarState {
  anchorEl: null | HTMLElement;
}

export const toitio = "https://toit.io";
export const console = "https://console.toit.io";
export const docs = "https://docs.toit.io";
export const libs = "https://libs.toit.io";
export const community = "https://slack.toit.io";

class ToolbarTop extends React.Component<ToolbarTopProps, ToolbarState> {
  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  state = {
    anchorEl: null,
  };
  render() {
    return (
      <MuiToolbar className={this.props.classes.toolbarTop}>
        {isWidthDown("xs", this.props.width, true) ? (
          <>
            <Typography variant="h6" className={this.props.classes.title}>
              {" "}
            </Typography>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              color="secondary"
              onClick={(e) => this.handleClick(e)}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={() => this.setState({ anchorEl: null })}
            >
              <MenuItem onClick={() => window.open(toitio, "_blank")}>Toit.io</MenuItem>
              <MenuItem onClick={() => window.open(console, "_blank")}>Console</MenuItem>
              <MenuItem onClick={() => window.open(docs, "_blank")}>Documentation</MenuItem>
              <MenuItem onClick={() => window.open(libs, "_blank")}>Library</MenuItem>
              <MenuItem onClick={() => window.open(community, "_blank")}>Community</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Typography variant="h6" className={this.props.classes.title}>
              {" "}
            </Typography>
            <Button color="secondary" href={toitio} target="blank">
              Toit.io
            </Button>
            <Button color="secondary" href={console} target="blank">
              Console
            </Button>
            <Button color="secondary" href={docs} target="blank">
              Documentation
            </Button>
            <Button color="secondary" href={libs} target="blank">
              Library
            </Button>
            <Button color="secondary" href={community} target="blank">
              Community
            </Button>
          </>
        )}
      </MuiToolbar>
    );
  }
}

export default withWidth()(withRouter(withStyles(styles)(ToolbarTop)));