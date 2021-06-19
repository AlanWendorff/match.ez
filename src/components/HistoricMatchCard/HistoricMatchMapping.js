import React, { Fragment } from "react";
import HistoricMatchCard from "./HistoricMatchCard";

const ListadoDeTarjetasPartidosPrevios = ({ prevMatch, teamid }) => (
    <Fragment>
        {prevMatch.map((match) => (
            <HistoricMatchCard match={match} teamId={teamid} key={match.id} />
        ))}
    </Fragment>
);

export default ListadoDeTarjetasPartidosPrevios;
