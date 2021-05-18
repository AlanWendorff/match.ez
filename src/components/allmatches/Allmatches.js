import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CircularTournaments from "../CircularTournaments/CircularTournaments";
import ListadoAllmatches from "./ListadoAllmatches";
import LoadScreen from "../Loader/LoadScreen";
import InfoCard from "../InfoCard/InfoCard";
import Warning from "../Warning/Warning";
import axios from "axios";
import "./allmatches.css";

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
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };//http://localhost:5000 https://arg-matchez-backend.herokuapp.com
    axios
      .get(`http://localhost:5000/api/allmatches`, config)
      .then(({ data }) => {
        guardarAllmatches(data);
        guardarMatchesMod(data.slice(0, 6));
        guardarLoaderProgress({ width: "100%" });
        if (data.length === 0) {
          guardarStateCrash(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { width } = loaderprogress;
  if (crash !== true) {
    if (width === "100%") {
      return (
        <div
          onContextMenu={(e) =>
            window.innerWidth > 1024 ? null : e.preventDefault()
          }
          className="allmatches background-color-4all"
        >
          {allmatches.length !== 0 ? (
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
          ) : (
            <InfoCard />
          )}
        </div>
      );
    } else {
      return (
        <div
          onContextMenu={(e) =>
            window.innerWidth > 1024 ? null : e.preventDefault()
          }
          className="allmatches background-color-4all"
        >
          <LoadScreen loaderprogress={loaderprogress} />
        </div>
      );
    }
  } else {
    return (
      <div
        onContextMenu={(e) =>
          window.innerWidth > 1024 ? null : e.preventDefault()
        }
        className="allmatches background-color-4all"
      >
        <Warning />
      </div>
    );
  }
};
export default AllMatches;
