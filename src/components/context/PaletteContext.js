import React, { createContext, useState } from "react";
export const PaletteContext = createContext();
const PaletteProvider = (props) => {
  const [palette, setPalette] = useState({});
  const [logo, setLogo] = useState("");
  return (
    <PaletteContext.Provider
      value={{
        setPalette,
        setLogo,
        palette,
        logo,
      }}
    >
      {props.children}
    </PaletteContext.Provider>
  );
};

export default PaletteProvider;
