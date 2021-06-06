import React, { Fragment } from "react";
import MatchCardRow from "../MatchCardRow/MatchCardRow";

const ListadoAllmatches = ({ matchesmod }) => (
    <Fragment>
        {matchesmod
            .sort(function (a, b) {
                return new Date(a.begin_at) - new Date(b.begin_at);
            })
            .map((match) => (
                <MatchCardRow key={match.id} match={match} />
            ))}
    </Fragment>
);

export default ListadoAllmatches;
