import React from "react";
import { Link } from 'react-router-dom';
import { TOURNAMENT } from '../../routes/routes';
import { LOOKMATCHES } from '../../titlestag/titlestag';
import { usePalette } from "react-palette";
import "./circulartournaments.css";

const CircularItem = ({ img, name, id, filterByTournament }) => {
  let colorImg = usePalette("https://proxy-kremowy.herokuapp.com/" + img).data;
  //title={FILTERBY + name}
  /* filterByTournament(name); */
  return (
    <Link
      className="cursor-pointer"
      to={TOURNAMENT.replace(':tournamentId', id)}
      title={LOOKMATCHES + name}
    >
      <div
        style={{
          border: `4px solid ${colorImg.lightVibrant}`,
        }}
        className="circular-item"
      >
        <img src={img} alt={id} />
      </div>
      <span
        className="font-gilroy"
        style={{
          backgroundColor: colorImg.lightVibrant,
        }}
      >
        {name.length > 10 ? name.substr(0, 9) + "..." : name}
      </span>
    </Link>
  );
};
export default CircularItem;
