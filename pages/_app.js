import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider, {
  ColorModeContext,
} from "../src/components/Menu/components/ColorMode";

// _app.js -> control the page initialization and:
// Persist layouts between page changes
// Keeping state when navigating pages
// Custom error handling using componentDidCatch
// Inject additional data into pages
// Add global CSS

const theme = {
  light: {
    backgroundBase: "#f9f9f9",
    backgroundLevel1: "#ffffff",
    backgroundLevel2: "#f0f0f0",
    backgroundLevel3: "#BA181B",
    borderBase: "#E5383B",
    textColorBase: "#161A1D",
  },
  dark: {
    backgroundBase: "#1E1E1E",
    backgroundLevel1: "#161A1D",
    backgroundLevel2: "#808080",
    backgroundLevel3: "#BA181B",
    borderBase: "#660708",
    textColorBase: "#F5F3F4",
  },
};

function ProviderWrapper(props) {
  return (
    <ColorModeProvider initialMode={"dark"}>{props.children}</ColorModeProvider>
  );
}

function MyApp({ Component, pageProps }) {
  const contextMode = React.useContext(ColorModeContext);
  console.log(contextMode.mode);
  return (
    <ThemeProvider theme={theme[contextMode.mode]}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default function _App(props) {
  return (
    <ProviderWrapper>
      <MyApp {...props} />
    </ProviderWrapper>
  );
}
