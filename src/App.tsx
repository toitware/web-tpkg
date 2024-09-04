// Copyright (C) 2023 Toitware ApS. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "./assets/theme/theme";
import MainView from "./components/MainView";

function getMetaValue(name: string): string | undefined {
  const elements = document.getElementsByName(name);
  if (elements.length === 1) {
    return (elements[0] as HTMLMetaElement).content;
  }
  return undefined;
}
export const API_URL = getMetaValue("api-url") || "/api/";

class App extends React.Component {
  render(): JSX.Element {
    return (
      <MuiThemeProvider theme={theme}>
        <MainView />
      </MuiThemeProvider>
    );
  }
}

export default App;
