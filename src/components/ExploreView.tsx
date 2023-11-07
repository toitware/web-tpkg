// Copyright (C) 2023 Toitware ApS. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import { createStyles, Grid, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import Footer, { footerHeight } from "./general/Footer";
import PackageSkeleton from "./package/PackageSkeleton";
import SearchPackage from "./search/SearchPackage";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      flex: 1,
      paddingTop: 126,
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    content: {
      paddingBottom: footerHeight,
    },
  });
export type Package = {
  result?: {
    package: {
      name: string;
      description: string;
      license: string;
      url: string;
      latestVersion: string;
    };
  };
  error?: {
    code: number;
    message: string;
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
  }

  render() {
    return (
      <Grid container className={this.props.classes.grid}>
        <Grid item xs={12} className={this.props.classes.content}>
          <Typography variant="h5" className={this.props.classes.title}>
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
          {this.props.packages
            ?.sort((a, b) => (a.result?.package.name || "").localeCompare(b.result?.package.name || ""))
            .map((element, i) => {
              if (element.result === undefined) {
                return null;
              }
              return (
                <SearchPackage
                  name={element.result?.package.name}
                  description={element.result?.package.description}
                  version={element.result?.package.latestVersion}
                  published={0}
                  key={i}
                  url={element.result?.package.url}
                />
              );
            })}
        </Grid>
        <Footer />
      </Grid>
    );
  }
}

export default withStyles(styles)(ExploreView);
