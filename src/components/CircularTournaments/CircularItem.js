import React from "react";
import { Link } from "react-router-dom";
import { LOOKMATCHES } from "../../titlestag/titlestag";
import { TOURNAMENT } from "../../routes/routes";
import { usePalette } from "react-palette";
import "./circulartournaments.css";

const CircularItem = ({ img, name, id }) => {
  let colorImg = usePalette("https://proxy-kremowy.herokuapp.com/" + img).data;
    console.log(colorImg);
  return (
    <Link
      style={{
        border: `4px solid ${colorImg.lightVibrant}`,
      }}
      className="circular-item"
      title={LOOKMATCHES + name}
      to={TOURNAMENT.replace(":tournamentId", id)}
    >
      <img src={img} alt={id} />
    </Link>
  );
};

export default CircularItem;
