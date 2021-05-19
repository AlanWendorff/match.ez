import React from "react";
import { Link } from 'react-router-dom';
import { TOURNAMENT } from '../../routes/routes';
import { LOOKMATCHES } from '../../titlestag/titlestag';
import "./circulartournaments.css";

const CircularItem = ({ img, name, id, colors }) => {
  return (
    <Link
      className="cursor-pointer"
      to={TOURNAMENT.replace(':tournamentId', id)}
      title={LOOKMATCHES + name}
    >
      <div
        style={{
          border: `4px solid ${colors.DarkVibrant}`,
        }}
        className="circular-item"
      >
        <img src={img} alt={id} />
      </div>
      <span
        className="font-gilroy"
        style={{
          backgroundColor: colors.LightVibrant,
        }}
      >
        {name.length > 10 ? name.substr(0, 9) + "..." : name}
      </span>
    </Link>
  );
};
export default CircularItem;
