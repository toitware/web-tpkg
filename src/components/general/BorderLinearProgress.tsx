import LinearProgress from "@material-ui/core/LinearProgress";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import React from "react";

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 2,
      borderRadius: 0,
      marginTop: -2,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.dark,
    },
  })
)(LinearProgress);

export default function ProgressBar(): JSX.Element {
  return <BorderLinearProgress variant="indeterminate" />;
}
