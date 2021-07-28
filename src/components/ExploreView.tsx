import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import PackagesTestFile from "../data/packages.json";
import PackageSkeleton from "./package/PackageSkeleton";
import SearchPackage from "./Search/SearchPackage";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      paddingTop: 126,
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  });
const API_URL = "https://pkg.infra.toit.io/api/v1/packages";
export type Package = {
  result: {
    package: {
      name: string;
      description: string;
      license: string;
      url: string;
      latestVersion: string;
    };
  };
};
export type Packages = {
  result: {
    packages: Package[];
  };
};

interface ExploreProps extends WithStyles<typeof styles> {
  packages?: Package[];
}
interface ExploreState {
  data: Package[];
  loading: boolean;
}

class ExploreView extends React.Component<ExploreProps, ExploreState> {
  state = {
    data: [] as Package[],
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
    this.setState({ data: PackagesTestFile });
  }

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h2" className={this.props.classes.title}>
            All packages
          </Typography>
          {this.state.loading && (
            <>
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
            </>
          )}
          {this.props.packages?.map((element, i) => {
            return (
              <SearchPackage
                name={element.result.package.name}
                description={element.result.package.description}
                version={element.result.package.latestVersion}
                access="public"
                published={0}
                key={i}
                url={element.result.package.url}
              />
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ExploreView);
