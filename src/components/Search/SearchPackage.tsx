import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PackageLineDetails from "../general/PackageLineDetails";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      paddingBottom: theme.spacing(4),
    },
    dot: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    title: {
      cursor: "pointer",
    },
  });

interface SearchPackageProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
  name: string;
  description: string;
  version: string;
  access: "public" | "private";
  published: number;
  url: string;
}

class SearchPackageView extends React.Component<SearchPackageProps> {
  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            className={this.props.classes.title}
            onClick={() =>
              this.props.history.push("package/" + this.props.name + "&url=" + this.props.url.split("/").join("%2F"))
            }
          >
            {this.props.name}
          </Typography>
          <Typography>{this.props.description}</Typography>
          <PackageLineDetails
            version={this.props.version}
            access={this.props.access}
            published={this.props.published}
          />
        </Grid>
      </Grid>
    );
  }

  capitalizeFirstLetter(input: string) {
    return input.slice(0, 1).toUpperCase() + input.slice(1);
  }
}

export default withRouter(withStyles(styles)(SearchPackageView));
