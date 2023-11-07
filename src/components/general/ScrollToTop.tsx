// Copyright (C) 2023 Toitware ApS. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import { Location } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

type ScrollToTopProps = RouteComponentProps;

class ScrollToTop extends React.Component<ScrollToTopProps> {
  componentDidUpdate(prevProps: { location: Location<unknown> }) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
