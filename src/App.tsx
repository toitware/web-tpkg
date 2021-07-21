import { MuiThemeProvider } from "@material-ui/core/styles";
import CookieConsent from "@toitware/cookie-consent";
import React from "react";
import "./App.css";
import theme from "./assets/theme/theme";
import MainView from "./components/MainView";
import Packages from "./data/packages.json";

const data = Packages;

class App extends React.Component {
  loadCrispChat() {
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

  async componentDidMount() {
    this.loadCrispChat();
    //const response = await fetch("https://pkg.infra.toit.io/api/v1/packages");
    console.log("response: ", data);
  }

  componentWillUnmount() {}

  render() {
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
        {/* TODO implement tracking, ask Jesper if we should do everything server side */}
        <CookieConsent segmentKey={segmentAPIKey} show={false} changeConsent={false} />
      </MuiThemeProvider>
    );
  }
}

export default App;
