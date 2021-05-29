import Moment from "moment";
import nopic from "../../Images/nopic.png";
import TBD from "../../Images/toBeDefined.png";

export const evalColors = (opponents, index) => {
  let color;
  if (opponents[index] !== false) {
    if (opponents[index].opponent.colors !== {}) {
      color = opponents[index].opponent.colors;
    } else {
      color = {
        DarkVibrant: "#2d6da3",
      };
    }
  } else {
    color = {
      DarkVibrant: "#2d6da3",
    };
  }
  return color;
};

export const getMessage = (opponents, bestOf, begin_at, league, serie) => {
  const Message = 
  `${opponents[0] === false ? "To be defined" : opponents[0].opponent.name} 
  VS 
  ${opponents[1] === false ? "To be defined" : opponents[1].opponent.name} 
  |
  ${bestOf} 
  |
  ${Moment(begin_at).format("Do")} ${Moment(begin_at).format(
    "MMMM - H:mm"
  )} hs ${league.name + " " + serie.full_name}
  -> ${window.location.href}`;

  return Message;
};

export const evalImg = (opponents, index) => {
  let img;
  if (opponents[index] !== false) {
    if (opponents[index].opponent.image_url === null) {
      img = nopic;
    } else {
      img = opponents[index].opponent.image_url;
    }
  } else {
    img = TBD;
  }
  return img;
};

export const evalName = (opponents, index) => {
  let name;
  if (opponents[index] !== false) {
    name = opponents[index].opponent.name;
  } else {
    name = "To be defined";
  }
  return name;
};
