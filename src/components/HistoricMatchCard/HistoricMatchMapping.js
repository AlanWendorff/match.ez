import React, { Fragment } from "react";
import HistoricMatchCard from "./HistoricMatchCard";
//import LazyLoad from "react-lazyload";

const ListadoDeTarjetasPartidosPrevios = ({ prevMatch, teamid }) => {
  if (!prevMatch.length > 0) return null;

  return (
    <Fragment>
      {prevMatch.map((match) => (
        <HistoricMatchCard match={match} teamId={teamid} key={match.id} />
      ))}
    </Fragment>
  );
};

export default ListadoDeTarjetasPartidosPrevios;
