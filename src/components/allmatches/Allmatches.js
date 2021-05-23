import React, { useEffect, useState, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ALL_MATCHES } from "../../const/ApiEndpoints";
import CircularTournaments from "../CircularTournaments/CircularTournaments";
import ListadoAllmatches from "./ListadoAllmatches";
import LoadScreen from "../Loader/LoadScreen";
import axios from "axios";
import "./allmatches.css";
const Warning = React.lazy(() => import("../Warning/Warning"));

const AllMatches = () => {
  const [loaderprogress, guardarLoaderProgress] = useState({ width: "0%" });
  const [crash, guardarStateCrash] = useState(false);
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
    guardarLoaderProgress({ width: "30%" });
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios.get(ALL_MATCHES, config).then(({ data }) => {
      if (data.length === 0) {
        guardarStateCrash(true);
      } else {
        guardarAllmatches(data);
        guardarMatchesMod(data.slice(0, 6));
      }
      guardarLoaderProgress({ width: "100%" });
    });
  }, []);
  const { width } = loaderprogress;


  //
  return (
    <div className="allmatches background-color-4all">
      {allmatches.length !== 0 && crash !== true && width === "100%" && (
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

      {width !== "100%" && <LoadScreen loaderprogress={loaderprogress} />}

      {crash === true && (
        <Suspense fallback={<div></div>}>
          <Warning />
        </Suspense>
      )}
    </div>
  );
};
export default AllMatches;
