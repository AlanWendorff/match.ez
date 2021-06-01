import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { ERROR } from "../../routes/routes";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  examplesTournamentsNull,
  examplesTournamentsAmerica,
  examplesTournamentsRest,
} from "./TournamentsExamples";
import { DATABASE_TOURNAMENTS } from "../../const/ApiEndpoints";
import { LocationContext } from "../Context/LocationContext";
import SearchTournament from "../SearchTournament/SearchTournament";
import Item from "./Item";
import "./tournaments.css";
import axios from "axios";

const Tournaments = () => {
  const history = useHistory();
  const { location } = useContext(LocationContext);
  const [examples, setExamples] = useState(examplesTournamentsNull);
  const [alltournaments, setAllTournaments] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [mode, setMode] = useState("example");

  const FilterTournament = () => {
    let input = document.getElementById("last_name").value.toLowerCase();
    input.length === 0 && setMode("example");
    let filteredTournaments = [];
    alltournaments.map((tournament) => {
      if (tournament.name.toLowerCase().includes(input) && input !== "") {
        filteredTournaments.push(tournament);
      }
    });
    setTournaments(filteredTournaments);
  }; 

  const getTournamentsFromDatabase = () => {
    setMode("loading");
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios(DATABASE_TOURNAMENTS, config).then(({ data }) => {
      data.status !== 200 && history.push(ERROR);
      setTournaments(data);
      setAllTournaments(data);
      setMode("tournaments");
    });
  };

  useEffect(() => {
    setMode("example");
    location === "america" && setExamples(examplesTournamentsAmerica);
    location === "rest" && setExamples(examplesTournamentsRest);
  }, [location]);

  return (
    <div className="tournament-container font-gilroy background-color-4all">
      {mode === "tournaments" && (
        <>
          <SearchTournament
            FilterTournament={FilterTournament}
            tournaments={tournaments}
            getTournamentsFromDatabase={getTournamentsFromDatabase}
          />
          <div className="child-tournament">
            {tournaments.length !== 0 ? (
              tournaments.map((tournament) => (
                <Item tournament={tournament} key={tournament.id} />
              ))
            ) : (
              <span
                className={`color-text-white font-bold animate__fadeInDown animate__faster ${
                  JSON.parse(localStorage.getItem("animations")) !== false &&
                  "animate__animated"
                }`}
              >
                THERE ARE NO TOURNAMENTS THAT CONTAINS '
                {document.getElementById("last_name").value}'
              </span>
            )}
          </div>
        </>
      )}

      {mode === "example" && (
        <>
          <SearchTournament
            FilterTournament={FilterTournament}
            tournaments={tournaments}
            getTournamentsFromDatabase={getTournamentsFromDatabase}
          />
          <div className="child-tournament">
            <span
              className={`color-text-white font-bold animate__fadeInDown animate__faster ${
                JSON.parse(localStorage.getItem("animations")) !== false &&
                "animate__animated"
              }`}
            >
              TOURNAMENTS THAT MAY INTEREST YOU
            </span>
            {examples.map((tournament) => (
              <Item tournament={tournament} key={tournament.id} />
            ))}
          </div>
          <div
            onClick={() => {
              tournaments.length === 0 && getTournamentsFromDatabase();
            }}
            className="load-more"
          >
            <FontAwesomeIcon icon={faCaretDown} />
            View all tournaments
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </>
      )}

      {mode === "loading" && (
        <div className="display-flex-justify-center height-100vh--50px width-100percent">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-red-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournaments;
