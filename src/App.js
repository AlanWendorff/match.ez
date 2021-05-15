import React from "react";
import Layout from "./Layout";
import TeamRankingProvider from "./components/Context/TeamRankingContext";
import HeaderLogoProvider from "./components/Context/HeaderLogoContext";
import LocationProvider from "./components/Context/LocationContext";
import LoaderProvider from "./components/Context/LoaderContext";
import TeamsProvider from "./components/Context/TeamsContext";

const App = () => {
  if (navigator.onLine !== true) {
    alert("No Internet Connection");
  } else {
    return (
      <TeamsProvider>
        <HeaderLogoProvider>
          <LoaderProvider>
            <TeamRankingProvider>
              <LocationProvider>
                <Layout />
              </LocationProvider>
            </TeamRankingProvider>
          </LoaderProvider>
        </HeaderLogoProvider>
      </TeamsProvider>
    );
  }
};

export default App;
