import React from "react";
import Layout from "./Layout";
import TeamRankingProvider from "./components/Context/TeamRankingContext";
import PaletteProvider from "./components/Context/PaletteContext";
import LocationProvider from "./components/Context/LocationContext";
import LoaderProvider from "./components/Context/LoaderContext";
import TeamsProvider from "./components/Context/TeamsContext";

const App = () => {
  if (navigator.onLine !== true) {
    alert("No Internet Connection");
  } else {
    return (
      <TeamsProvider>
        <PaletteProvider>
          <LoaderProvider>
            <TeamRankingProvider>
              <LocationProvider>
                <Layout />
              </LocationProvider>
            </TeamRankingProvider>
          </LoaderProvider>
        </PaletteProvider>
      </TeamsProvider>
    );
  }
};

export default App;
