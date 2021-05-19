import React from "react";
import Layout from "./Layout";
import TeamRankingProvider from "./components/Context/TeamRankingContext";
import PaletteProvider from "./components/Context/PaletteContext";
import LocationProvider from "./components/Context/LocationContext";
import LoaderProvider from "./components/Context/LoaderContext";

const App = () => {
  if (navigator.onLine !== true) {
    alert("No Internet Connection");
  } else {
    return (
      <PaletteProvider>
        <LoaderProvider>
          <TeamRankingProvider>
            <LocationProvider>
              <Layout />
            </LocationProvider>
          </TeamRankingProvider>
        </LoaderProvider>
      </PaletteProvider>
    );
  }
};

export default App;
