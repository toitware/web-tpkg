import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    dot: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  });

interface PackageLineDetailsProps extends WithStyles<typeof styles> {
  version: string;
  published: number | undefined;
  url: string;
}

class PackageLineDetailsView extends React.Component<PackageLineDetailsProps> {
  render() {
    return (
      <Grid container direction="row">
        <Typography variant="body2">{this.props.version}</Typography>
        <Typography className={this.props.classes.dot}>•</Typography>
        <Typography variant="body2">{this.props.url}</Typography>
        {/* 
        introduce again when data is available
        <Typography className={this.props.classes.dot}>•</Typography>
        <Typography variant="body2">{new Date(this.props.published).toISOString().split("T")[0]}</Typography> */}
      </Grid>
    );
  }

  capitalizeFirstLetter(input: string) {
    return input.slice(0, 1).toUpperCase() + input.slice(1);
  }
}

export default withStyles(styles)(PackageLineDetailsView);
