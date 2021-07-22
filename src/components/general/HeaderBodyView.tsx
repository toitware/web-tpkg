import { createStyles, Theme, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    header: {
      flexGrow: 0,
      width: "100%",
    },
    headerTitle: {
      padding: theme.spacing(1),
      flex: 1,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
    },
    body: {
      flexGrow: 1,
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    innerBody: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      position: "relative",
    },
    flex: {
      display: "flex",
    },
  });

type HeaderBodyProps = WithStyles<typeof styles>;

class HeaderBodyView extends React.Component<HeaderBodyProps> {
  render() {
    return <div className={this.props.classes.wrapper}>{this.props.children}</div>;
  }
}

interface HeaderProps extends WithStyles<typeof styles> {
  flex?: boolean;
}

class HeaderView extends React.Component<HeaderProps> {
  render() {
    return (
      <div className={clsx(this.props.classes.header, this.props.flex ? this.props.classes.flex : "")}>
        {this.props.children}
      </div>
    );
  }
}

class HeaderTitleView extends React.Component<WithStyles<typeof styles>> {
  render() {
    return <div className={this.props.classes.headerTitle}>{this.props.children}</div>;
  }
}

type BodyProps = WithStyles<typeof styles>;

class BodyView extends React.Component<BodyProps> {
  render() {
    return (
      <div className={this.props.classes.body}>
        <div className={this.props.classes.innerBody}>{this.props.children}</div>
      </div>
    );
  }
}

const withStyle = withStyles(styles);
const Header = withStyle(HeaderView);
const HeaderTitle = withStyle(HeaderTitleView);
const Body = withStyle(BodyView);

export { Header, HeaderTitle, Body };
export default withStyle(HeaderBodyView);
