import React, { useEffect, useState } from "react";
import CircularItem from "./CircularItem";
import "./CirularTournaments.css";

const CircularTournaments = ({ matches, show, prevMatch }) => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    let modTournaments = [];
    const m = prevMatch ? prevMatch : matches;
    m.map((match) => {
      modTournaments.push({
        name: match.league.name ? match.league.name : "none",
        img: match.league.image_url ? match.league.image_url : "none",
        id: match.league.id ? match.league.id : "none",
        colors: match.league.colors ? match.league.colors : "none",
      });
    });
    if (modTournaments.length !== 0) {
      modTournaments = modTournaments.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
    }
    setTournaments(modTournaments);
  }, [show]);

  return (
    <div className="circular-container">
      <div>
        {tournaments.map((tournament) => (
          <CircularItem
            key={tournament.id}
            img={tournament.img}
            name={tournament.name}
            id={tournament.id}
            colors={tournament.colors}
          />
        ))}
      </div>
    </div>
  );
};

export default CircularTournaments;
