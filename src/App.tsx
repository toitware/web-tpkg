import { MuiThemeProvider } from "@material-ui/core/styles";
import CookieConsent from "@toitware/cookie-consent";
import React from "react";
import theme from "./assets/theme/theme";
import MainView from "./components/MainView";

class App extends React.Component {
  loadCrispChat(): void {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "bf6d2763-2d2d-4ebb-b8eb-da83a95ec3bf";

    (function () {
      const d = document;
      const s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }

  async componentDidMount(): Promise<void> {
    this.loadCrispChat();
  }
  render(): JSX.Element {
    let segmentAPIKey = "";
    if (typeof document !== `undefined`) {
      // Check if the meta segment-key is set.
      const segmentKeyDOM = document.querySelector('meta[name="segment-key"]');
      if (segmentKeyDOM) {
        segmentAPIKey = segmentKeyDOM.getAttribute("content") || segmentAPIKey;
      }
    }
    return (
      <MuiThemeProvider theme={theme}>
        <MainView />
        <CookieConsent segmentKey={segmentAPIKey || "no-key"} show={true} changeConsent={false} />
      </MuiThemeProvider>
    );
  }
}

export default App;
