import React, { Fragment } from "react";
import TarjetaAllmatches from "./TarjetaAllmatches";
import MatchCardRow from "../MatchCardRow/MatchCardRow";
import LazyLoad from "react-lazyload";

const ListadoAllmatches = ({ matchesmod }) => {
  if (!matchesmod.length > 0) return null;

  return (
    <Fragment>
      {matchesmod
        .sort(function (a, b) {
          return new Date(a.begin_at) - new Date(b.begin_at);
        })
        .map((match) => {
          return (
            <LazyLoad offset={100} height={100} overflow key={match.id}>
              <MatchCardRow match={match} />
            </LazyLoad>
          );
        })}
    </Fragment>
  );
};

export default ListadoAllmatches;
