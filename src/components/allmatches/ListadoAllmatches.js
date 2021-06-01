import React, { Fragment } from "react";
import MatchCardRow from "../MatchCardRow/MatchCardRow";
import TarjetaAllmatches from "./TarjetaAllmatches";
//import LazyLoad from "react-lazyload";

const ListadoAllmatches = ({ matchesmod }) => {
  if (!matchesmod.length > 0) return null;

  return (
    <Fragment>
      {matchesmod
        .sort(function (a, b) {
          return new Date(a.begin_at) - new Date(b.begin_at);
        })
        .map((match) => {
          return JSON.parse(localStorage.getItem("old")) === false ? (
            <MatchCardRow key={match.id} match={match} />
          ) : (
            <TarjetaAllmatches key={match.id} match={match} />
          );
          /* <LazyLoad offset={50} height={50} overflow key={match.id}>
              <MatchCardRow match={match} />
            </LazyLoad> */
        })}
    </Fragment>
  );
};

export default ListadoAllmatches;
