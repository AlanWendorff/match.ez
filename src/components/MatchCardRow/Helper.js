import Moment from "moment";
import nopic from "../../assets/images/placeholder/nopic.png";
import TBD from "../../assets/images/placeholder/toBeDefined.png";

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
    const Message = `${opponents[0] === false ? "To be defined" : opponents[0].opponent.name} VS ${
        opponents[1] === false ? "To be defined" : opponents[1].opponent.name
    } | ${bestOf} | ${Moment(begin_at).format("Do")} ${Moment(begin_at).format("MMMM - H:mm")} hs ${
        league.name + " " + serie.full_name
    } -> ${window.location.href}`;

    return Message;
};

export const getMessageLive = (opponents, bestOf, league, serie, results, official_stream_url, stage) => {
    const Message = `${opponents[0].opponent.name} ${results[0].score} - ${results[1].score} ${
        opponents[1].opponent.name
    } | ${bestOf} | ${league.name + " " + stage} -> ${official_stream_url}`;

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

export const evalMaps = (results) => {
    let mapPlaying;
    if (results[0].score === 0 && results[1].score === 0) {
        mapPlaying = " - Playing 1st map";
    } else if (
        (results[0].score === 1 && results[1].score === 0) ||
        (results[0].score === 0 && results[1].score === 1)
    ) {
        mapPlaying = " - Playing 2th map";
    } else {
        mapPlaying = " - Playing 3th map";
    }
    if ((results[0].score === 2 && results[1].score === 1) || (results[0].score === 1 && results[1].score === 2)) {
        mapPlaying = " - Playing 4th map";
    } else if (results[0].score === 2 && results[1].score === 2) {
        mapPlaying = " - Playing 5th map";
    }
    return mapPlaying;
};
