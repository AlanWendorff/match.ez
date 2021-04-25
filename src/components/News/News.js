import React, { useContext } from "react";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import LoadScreen from "../Loader/LoadScreen";
import Warning from "../Warning/Warning";
import Moment from 'moment';
import "./news.css";

const news = [
    {
        "title": "motm leaves High Coast",
        "description": "The 21-year-old had joined the team on trial only one month ago.",
        "link": "https://www.hltv.org/news/31624/motm-leaves-high-coast",
        "time": "2021-04-24T22:12:00.000Z"
    },
    {
        "title": "DETONA withdraw from CBCS RMR over alleged skin changer ban",
        "description": "The Brazilian team leave the tournament a day into the campaign.",
        "link": "https://www.hltv.org/news/31623/detona-withdraw-from-cbcs-rmr-over-alleged-skin-changer-ban",
        "time": "2021-04-24T20:57:00.000Z"
    },
    {
        "title": "Extra Salt edge out forZe to reach FunSpark ULTI grand final",
        "description": "The North American side will be fighting for their first European title on Sunday.",
        "link": "https://www.hltv.org/news/31622/extra-salt-edge-out-forze-to-reach-funspark-ulti-grand-final",
        "time": "2021-04-24T19:10:00.000Z"
    },
    {
        "title": "BIG eliminate HAVU from FunSpark ULTI Europe Final",
        "description": "The German squad denied HAVU a CT-side comeback on Train to secure the series 2-0.",
        "link": "https://www.hltv.org/news/31621/big-eliminate-havu-from-funspark-ulti-europe-final",
        "time": "2021-04-24T13:50:00.000Z"
    },
    {
        "title": "DreamHack Masters Spring 2021 group stage Fantasy game goes live",
        "description": "With another stop of the ESL Pro Tour circuit closing in, the Fantasy game for the event is open for business.",
        "link": "https://www.hltv.org/news/31617/dreamhack-masters-spring-2021-group-stage-fantasy-game-goes-live",
        "time": "2021-04-24T06:34:00.000Z"
    },
    {
        "title": "Video: allu vs. DBL PONEY",
        "description": "",
        "link": "https://www.hltv.org/news/31620/video-allu-vs-dbl-poney",
        "time": "2021-04-23T21:29:00.000Z"
    },
    {
        "title": "HAVU beat Dignitas, BIG eliminate Complexity from FunSpark ULTI",
        "description": "The winners will face each other in the lower bracket final on Saturday.",
        "link": "https://www.hltv.org/news/31616/havu-beat-dignitas-big-eliminate-complexity-from-funspark-ulti",
        "time": "2021-04-23T20:01:00.000Z"
    },
    {
        "title": "Calyx parts ways with GORILLAZ",
        "description": "The Robin \"flusha\" Rönnquist-led squad is down a player after a brief trial period with the Turk.",
        "link": "https://www.hltv.org/news/31619/calyx-parts-ways-with-gorillaz",
        "time": "2021-04-23T19:42:00.000Z"
    },
    {
        "title": "Complexity, mousesports among eight teams invited to Flashpoint 3 Closed Qualifier",
        "description": "Benjamin \"blameF\" Bremer's side is the only top 10 team that will have to qualify for the Regional Major Ranking (RMR) event.",
        "link": "https://www.hltv.org/news/31618/complexity-mousesports-among-eight-teams-invited-to-flashpoint-3-closed-qualifier",
        "time": "2021-04-23T18:02:00.000Z"
    },
    {
        "title": "device: \"I had a lot of time to reflect on my career and how I can create my best possible legacy\"",
        "description": "The Danish AWPer spoke about his motivations to join NIP and his expectations, both for himself and for his new team.",
        "link": "https://www.hltv.org/news/31615/device-i-had-a-lot-of-time-to-reflect-on-my-career-and-how-i-can-create-my-best-possible-legacy",
        "time": "2021-04-23T17:30:00.000Z"
    }
];

const News = () => {
  const { colors } = useContext(ColorThemeContext);
    const badfetch = false;
  return colors.background_color !== undefined ? (
    !badfetch ? (
      <div
        className="news-container font-gilroy"
        style={{ backgroundColor: colors.background_color }}
      >
        {news.length > 0 ? (
            news.map((n) => (
                <div className="new" key={n.title}>
                    <h1>{n.title}</h1>
                    <h2><hr/>{Moment(n.time).format("MMM, DD - YYYY")}<hr/></h2>
                    <p>{n.description}</p>
                    <span><hr/><a rel="noopener noreferrer" target="_blank" href={n.link} >You can read more on: HLTV.org Post</a><hr/></span>
                </div>
            ))
        ) : (
          <LoadScreen />
        )}
      </div>
    ) : (
      <div
        className="news-container font-gilroy"
        style={{ backgroundColor: colors.background_color }}
      >
        <Warning />
      </div>
    )
  ) : (
    <SimpleLoadScreen />
  );
};

export default News;
