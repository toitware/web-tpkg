// Copyright (C) 2023 Toitware ApS. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import { Button, createStyles, IconButton, Snackbar, Theme, WithStyles, withStyles } from "@material-ui/core";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import React from "react";
import { useHistory } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    snackbarMessage: {
      display: "flex",
      alignItems: "center",
    },
    resultIcon: {
      marginRight: theme.spacing(1),
      fontSize: 20,
    },
  });

interface ButtonProps {
  text: string;
  link: string;
}

interface SnackBarProps extends WithStyles<typeof styles> {
  open: boolean;
  message: string;
  buttonProps?: ButtonProps;
  onClose: () => void;
  type: "info" | "error" | "success";
}

interface State {
  menuWidth: string | null;
}

const defaultAutoHideDuration = 6000;

class SnackBarComponent extends React.Component<SnackBarProps, State> {
  state = {
    menuWidth: "",
  };

  componentDidMount() {
    this.setState({ menuWidth: sessionStorage.getItem("menuWidth")?.toString() || "" });
  }

  componentDidUpdate() {
    if (sessionStorage.getItem("menuWidth") && sessionStorage.getItem("menuWidth") !== this.state.menuWidth) {
      this.setState({
        menuWidth: sessionStorage.getItem("menuWidth") !== null ? sessionStorage.getItem("menuWidth") : "",
      });
    }
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={this.props.open}
        autoHideDuration={defaultAutoHideDuration}
        style={{ marginLeft: parseInt(this.state.menuWidth !== "" ? this.state.menuWidth : "0") / 2 }}
        action={
          <React.Fragment>
            {this.props.buttonProps && this.props.buttonProps.text && (
              <LinkButton text={this.props.buttonProps.text} link={this.props.buttonProps.link} />
            )}
            <IconButton aria-label="close" color="inherit" onClick={() => this.props.onClose()}>
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          this.props.onClose();
        }}
        message={
          <div className={this.props.classes.snackbarMessage}>
            {this.props.type === "success" ? (
              <SuccessIcon className={this.props.classes.resultIcon} />
            ) : this.props.type === "error" ? (
              <ErrorIcon className={this.props.classes.resultIcon} />
            ) : (
              <></>
            )}
            {this.props.message}
          </div>
        }
      ></Snackbar>
    );
  }
}

function LinkButton(props: ButtonProps) {
  const history = useHistory();

  return (
    <Button size="small" color="inherit" variant="text" onClick={() => history.push(props.link)}>
      {props.text}
    </Button>
  );
}

export const SnackBar = withStyles(styles)(SnackBarComponent);
