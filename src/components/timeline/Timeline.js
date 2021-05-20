import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  faCalendarDay,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import { LOOKMATCHES, LOOKPROFILE } from "../../titlestag/titlestag";
import { TOURNAMENT, TEAM } from "../../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { TIME_LINE } from "../../const/ApiEndpoints";
import LoadScreen from "../Loader/LoadScreen";
import Warning from "../Warning/Warning";
import shortid from "shortid";
import Moment from "moment";
import csgoLogoDefaultBlack from "../../Images/csgoLogoDefaultBlack.png";
import toBeDefined from "../../Images/toBeDefined.png";
import "react-vertical-timeline-component/style.min.css";
import axios from "axios";
import "./timeline.css";

const Timeline = () => {
  const [time, setTime] = useState([]);
  const [loaderprogress, guardarLoaderProgress] = useState({ width: "0%" });
  const [crash, guardarStateCrash] = useState(false);

  useEffect(() => {
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios.get(TIME_LINE, config).then(({ data }) => {
      setTime(data);
      guardarLoaderProgress({ width: "100%" });
      if (data.length === 0) {
        guardarStateCrash(true);
        guardarLoaderProgress({ width: "100%" });
      }
    });
  }, []);

  const { width } = loaderprogress;

  if (crash !== true) {
    if (width === "100%") {
      return (
        <div className="time-line-container font-gilroy background-color-4all">
          <VerticalTimeline layout="1-column-left">
            {time.map((tournament) => {
              const {
                begin_at,
                league,
                serie,
                name,
                teams,
                prizepool,
                league_id,
                colors,
              } = tournament;
              const dayuser = new Date().getDate();
              const day = Moment(begin_at).format("DD");
              const date =
                parseInt(day) === parseInt(dayuser)
                  ? "Today " + Moment(begin_at).format("HH:mm") + " hs"
                  : Moment(begin_at).format("DD - MMMM - HH:mm") + " hs";
              return (
                <VerticalTimelineElement
                  key={shortid.generate()}
                  className="vertical-timeline-element--education"
                  date={date}
                  style={{ backgroundColor: colors.DarkVibrant }}
                  iconStyle={{ border: `3px solid ${colors.DarkVibrant}` }}
                  icon={
                    <Link
                      to={TOURNAMENT.replace(":tournamentId", league_id)}
                      title={LOOKMATCHES + league.name}
                    >
                      <img
                        alt="League"
                        className="tournament-logo-timeline"
                        src={league.image_url}
                      />
                    </Link>
                  }
                >
                  <h3 className="vertical-timeline-element-title">
                    {league.name}
                  </h3>
                  <h5 className="vertical-timeline-element-subtitle">
                    {serie.full_name}
                  </h5>

                  <div className="column-align mb-5px">
                    <h5 className="vertical-timeline-element-subtitle name-of-tournament tournament-data light-white">
                      <FontAwesomeIcon icon={faCalendarDay} /> {date}
                    </h5>
                    <span className="vertical-timeline-element-subtitle name-of-tournament tournament-data">
                      {name}
                    </span>
                    <span className="tournament-data">
                      Tier:{" "}
                      <span className="font-gilroy-bold">{serie.tier}</span>
                    </span>
                    {prizepool && (
                      <label className="tournament-data light-white">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} />{" "}
                        <span className="font-gilroy-bold">{prizepool}</span>
                      </label>
                    )}
                  </div>

                  <div className="teams-in-tournament">
                    {teams.length > 1 ? (
                      teams.map((team) => (
                        <Link
                          to={TEAM.replace(":teamid", team.id)}
                          title={LOOKPROFILE + team.name}
                          key={shortid.generate()}
                        >
                          <div className="icon-container">
                            <div className="team-icon">
                              <img
                                className="team-logo-timeline"
                                alt="team"
                                src={
                                  team.image_url === null
                                    ? csgoLogoDefaultBlack
                                    : team.image_url
                                }
                              />
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="no-team-container">
                        <div className="no-team">
                          <img
                            alt="no team"
                            className="team-logo-timeline"
                            src={toBeDefined}
                          />
                        </div>
                        <div className="no-team">
                          <img
                            alt="no team"
                            className="team-logo-timeline"
                            src={toBeDefined}
                          />
                        </div>
                        <div className="no-team">
                          <img
                            alt="no team"
                            className="team-logo-timeline"
                            src={toBeDefined}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mobile light-white">
                    <span className="vertical-timeline-element-subtitle name-of-tournament tournament-data">
                      {name}
                    </span>
                    <span className="tournament-data">
                      Tier:{" "}
                      <span className="font-gilroy-bold">{serie.tier}</span>
                    </span>
                  </div>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      );
    } else {
      return (
        <div className="time-line-container background-color-4all">
          <LoadScreen loaderprogress={loaderprogress} />
        </div>
      );
    }
  } else {
    return (
      <div className="time-line-container background-color-4all">
        <Warning />
      </div>
    );
  }
};

export default Timeline;
