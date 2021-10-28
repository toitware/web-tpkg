import { MuiThemeProvider } from "@material-ui/core/styles";
import CookieConsent from "@toitware/cookie-consent";
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
export const SEGMENT_KEY = getMetaValue("segment-key") || "";

class App extends React.Component {
  loadCrispChat(): void {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "d7358065-35d6-43ee-bcd9-608d223d7aab";

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
    return (
      <MuiThemeProvider theme={theme}>
        <MainView />
        <CookieConsent
          amplitudeAPIEndpoint={"amplitude.toit.io"}
          segmentKey={SEGMENT_KEY}
          show={true}
          changeConsent={false}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
