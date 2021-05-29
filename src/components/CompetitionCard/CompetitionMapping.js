import React, { Fragment } from "react";
import CompetitionCard from "./CompetitionCard";
import LazyLoad from "react-lazyload";

const CompetitionMapping = ({ matchesHoy, palette }) => {
  if (!matchesHoy.length > 0) return null;
  return (
    <Fragment>
      {matchesHoy
        .sort(function (a, b) {
          return new Date(a.begin_at) - new Date(b.begin_at);
        })
        .map((match) => {
          return (
            <LazyLoad offset={100} height={100} overflow key={match.id}>
              <CompetitionCard match={match} palette={palette} />
            </LazyLoad>
          );
        })}
    </Fragment>
  );
};

export default CompetitionMapping;
