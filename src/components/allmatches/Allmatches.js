import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { ERROR } from "../../routes/routes";
import { ALL_MATCHES } from "../../const/ApiEndpoints";
import CircularTournaments from "../CircularTournaments/CircularTournaments";
import ListadoAllmatches from "./ListadoAllmatches";
import LoadScreen from "../Loader/LoadScreen";
import axios from "axios";
import "./allmatches.css";

const AllMatches = () => {
  const history = useHistory();
  const [allmatches, guardarAllmatches] = useState([]);
  const [matchesmod, guardarMatchesMod] = useState([]);

  const loadMoreItems = () => {
    let arrayLimit =
      matchesmod.length === 6
        ? Math.round(allmatches.length / 2)
        : allmatches.length;
    guardarMatchesMod(allmatches.slice(0, arrayLimit));
  };

  useEffect(() => {
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios.get(ALL_MATCHES, config).then(({ data }) => {
      data.status !== 200 && history.push(ERROR);
      guardarAllmatches(data.matches); 
      guardarMatchesMod(data.matches.slice(0, 6));
    });
  }, []);

  return (
    <div className="allmatches background-color-4all">
      {allmatches.length !== 0 && (
        <>
          <CircularTournaments matches={allmatches} />
          <ListadoAllmatches matchesmod={matchesmod} />
          {matchesmod.length !== allmatches.length && (
            <div
              onClick={() => {
                loadMoreItems();
              }}
              className="load-more"
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          )}
        </>
      )}

      {allmatches.length === 0 && <LoadScreen />}
    </div>
  );
};
export default AllMatches;
