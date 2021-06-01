import React from "react";
import Layout from "./Layout";
import TeamRankingProvider from "./components/Context/TeamRankingContext";
import PaletteProvider from "./components/Context/PaletteContext";
import LocationProvider from "./components/Context/LocationContext";
import LoaderProvider from "./components/Context/LoaderContext";
const App = () => (
  <PaletteProvider>
    <LoaderProvider>
      <TeamRankingProvider>
        <LocationProvider>
          <Layout
            onContextMenu={(e) =>
              window.innerWidth > 1024 ? null : e.preventDefault()
            }
          />
        </LocationProvider>
      </TeamRankingProvider>
    </LoaderProvider>
  </PaletteProvider>
);

export default App;
