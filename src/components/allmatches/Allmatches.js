import React, { useEffect, useState, useContext } from "react";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import { getAllmatches } from "./getAllmatches.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import InfoCard from "../InfoCard/InfoCard";
import ListadoAllmatches from "./ListadoAllmatches";
import Warning from "../Warning/Warning";
import LoadScreen from "../Loader/LoadScreen";
import "./allmatches.css";

const AllMatches = () => {
  const { colors } = useContext(ColorThemeContext);
  const [loaderprogress, guardarLoaderProgress] = useState({ width: "0%" });
  const [crash, guardarStateCrash] = useState(false);
  const [noMatches, guardarNoMatches] = useState(false);
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
    (async () => {
      if (!allmatches.length > 0) {
        const { AllMatches, badFetch } = await getAllmatches();
        if (AllMatches) {
          guardarLoaderProgress({ width: "100%" });
          const matchesFiltered = AllMatches.filter(
            (status) => status.status !== "canceled"
          );
          guardarAllmatches(matchesFiltered);
          guardarMatchesMod(matchesFiltered.slice(0, 6));
          if (AllMatches.length === 0) {
            guardarNoMatches(true);
          }
        }
        if (badFetch) {
          guardarStateCrash(true);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { width } = loaderprogress;
  if (colors !== undefined) {
    if (crash !== true) {
      if (width === "100%") {
        return (
          <div
            onContextMenu={(e) =>
              window.innerWidth > 1024 ? null : e.preventDefault()
            }
            className="allmatches"
            style={{ backgroundColor: colors.background_color }}
          >
            {noMatches !== true ? (
              <>
                <ListadoAllmatches matchesmod={matchesmod} />
                {matchesmod.length !== allmatches.length && (
                  <div
                    onClick={() => {
                      loadMoreItems();
                    }}
                    className="load-more"
                  >
                    <FontAwesomeIcon icon={faCaretSquareDown} /> Load More{" "}
                    <FontAwesomeIcon icon={faCaretSquareDown} />{" "}
                  </div>
                )}
              </>
            ) : (
              <InfoCard noMatches={noMatches} />
            )}
          </div>
        );
      } else {
        return (
          <div
            onContextMenu={(e) =>
              window.innerWidth > 1024 ? null : e.preventDefault()
            }
            className="allmatches"
            style={{ backgroundColor: colors.background_color }}
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
          className="allmatches"
          style={{ backgroundColor: colors.background_color }}
        >
          <Warning />
        </div>
      );
    }
  } else {
    return (
      <div
        onContextMenu={(e) =>
          window.innerWidth > 1024 ? null : e.preventDefault()
        }
        className="allmatches"
      >
        <SimpleLoadScreen />
      </div>
    );
  }
};
export default AllMatches;
