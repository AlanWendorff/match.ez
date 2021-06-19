import React, { Fragment } from "react";
import OneTeamCard from "./OneTeamCard";

const OneTeamMapping = ({ matches, teamid }) => (
    <Fragment>
        {matches.map((match) => (
            <OneTeamCard match={match} teamid={teamid} key={match.id} />
        ))}
    </Fragment>
);

export default OneTeamMapping;
