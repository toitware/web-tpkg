import {
  CircularProgress,
  createStyles,
  Grid,
  Input,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      paddingTop: 0,
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  });
const API_REGISTER_URL = "https://pkg.infra.toit.io/api/v1/register/";

type RegisterProps = WithStyles<typeof styles>;
interface RegisterState {
  loading: boolean;
}

class RegisterView extends React.Component<RegisterProps, RegisterState> {
  state = {
    loading: false,
  };

  componentDidMount() {}

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h3" className={this.props.classes.title}>
            Register package
          </Typography>
          {this.state.loading && (
            <>
              <CircularProgress />
            </>
          )}
          {!this.state.loading && <Input></Input>}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(RegisterView);
