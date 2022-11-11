import React from "react";
import { ColorModeContext } from "../src/components/Menu/components/ColorMode";

export default function Video() {
  const contextMode = React.useContext(ColorModeContext);

  return (
    <div>
      Video!
      {contextMode.mode}
      <button onClick={() => contextMode.toggleMode()}>Change mode</button>
    </div>
  );
}
