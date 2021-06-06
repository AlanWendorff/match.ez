import React, { Fragment } from "react";
import MatchCardRow from "../MatchCardRow/MatchCardRow";

const CompetitionMapping = ({ matchesHoy }) => (
    <Fragment>
        {matchesHoy
            .sort(function (a, b) {
                return new Date(a.begin_at) - new Date(b.begin_at);
            })
            .map((match) => (
                <MatchCardRow key={match.id} match={match} />
            ))}
    </Fragment>
);

export default CompetitionMapping;
