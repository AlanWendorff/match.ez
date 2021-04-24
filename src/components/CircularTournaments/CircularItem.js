import React from "react";
import { FILTERBY } from "../../titlestag/titlestag";
import { usePalette } from "react-palette";
import "./circulartournaments.css";

const CircularItem = ({ img, name, id }) => {
  let colorImg = usePalette("https://proxy-kremowy.herokuapp.com/" + img).data;
  return (
    <div className="cursor-pointer" >
      <div
        style={{
          border: `4px solid ${colorImg.lightVibrant}`,
        }}
        className="circular-item"
        title={FILTERBY + name}
      >
        <img src={img} alt={id} />
      </div>
      <span
        className="font-gilroy"
        style={{
          backgroundColor: colorImg.lightVibrant,
        }}
      >
        {name.length > 10? name.substr(0,9) + '...' : name}
      </span>
    </div>
  );
};
export default CircularItem;
