import React from "react";
import Layout from "./Layout";
import TournamentProvider from "./components/Context/TournamentContext";
import PathProvider from "./components/Context/PathContext";
import HeaderLogoProvider from "./components/Context/HeaderLogoContext";
import LoaderProvider from "./components/Context/LoaderContext";
import TeamRankingProvider from "./components/Context/TeamRankingContext";

const App = () => {
  if (navigator.onLine !== true) {
    alert("No Internet Connection");
  } else {
    return (
      <PathProvider>
        <HeaderLogoProvider>
          <LoaderProvider>
            <TournamentProvider>
              <TeamRankingProvider>
                <Layout />
              </TeamRankingProvider>
            </TournamentProvider>
          </LoaderProvider>
        </HeaderLogoProvider>
      </PathProvider>
    );
  }
};

export default App;
