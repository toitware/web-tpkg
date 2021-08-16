import { Box, createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
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
    package: {
      cursor: "pointer",
    },
  });

interface SearchPackageProps extends WithStyles<typeof styles>, RouteComponentProps {
  history: History;
  name: string;
  description: string;
  version: string;
  published?: number;
  url: string;
}

class SearchPackage extends React.Component<SearchPackageProps> {
  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Box
          onClick={() =>
            this.props.history.push("package/" + this.props.url.split("/").join("%2F") + "@v" + this.props.version)
          }
          className={this.props.classes.package}
        >
          <Grid item xs={12}>
            <Typography variant="h6">{this.props.name}</Typography>
            <Typography>{this.props.description}</Typography>
            <PackageLineDetails version={this.props.version} published={this.props.published} url={this.props.url} />
          </Grid>
        </Box>
      </Grid>
    );
  }

  capitalizeFirstLetter(input: string) {
    return input.slice(0, 1).toUpperCase() + input.slice(1);
  }
}

export default withRouter(withStyles(styles)(SearchPackage));
