import React, { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { faCalendarDay, faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import { LOOKMATCHES, LOOKPROFILE } from "../../titles/TitleTag";
import { TOURNAMENT, TEAM, ERROR } from "../../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { TIME_LINE } from "../../constants/ApiEndpoints";
import Loader from "../Loader/Loader";
import Moment from "moment";
import loader from "../../assets/images/placeholder/loader.gif";
import ProgressiveImage from "react-progressive-image";
import nopic from "../../assets/images/placeholder/nopic.png";
import axios from "axios";
import "react-vertical-timeline-component/style.min.css";
import "./Timeline.css";

const Timeline = () => {
    const history = useHistory();
    const [time, setTime] = useState([]);

    useEffect(() => {
        const config = {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
        axios.get(TIME_LINE, config).then(({ data }) => {
            data.status !== 200 && history.push(ERROR);
            setTime(data.timeline);
        });
    }, []);

    return time.length !== 0 ? (
        <div className="time-line-container font-gilroy background-color-4all">
            <VerticalTimeline layout="1-column-left">
                {time.map((tournament) => {
                    const { begin_at, league, serie, name, teams, prizepool, league_id, colors } = tournament;
                    const dayuser = new Date().getDate();
                    const day = Moment(begin_at).format("DD");
                    const date =
                        parseInt(day) === parseInt(dayuser)
                            ? "Today " + Moment(begin_at).format("HH:mm") + " hs"
                            : Moment(begin_at).format("DD - MMMM - HH:mm") + " hs";
                    return (
                        <VerticalTimelineElement
                            key={league_id + name}
                            className="vertical-timeline-element--education"
                            date={date}
                            style={{ backgroundColor: colors.DarkVibrant }}
                            iconStyle={{ border: `3px solid ${colors.DarkVibrant}` }}
                            icon={
                                <Link
                                    to={TOURNAMENT.replace(":tournamentId", league_id)}
                                    title={LOOKMATCHES + league.name}
                                >
                                    <img alt="League" className="tournament-logo-timeline" src={league.image_url} />
                                </Link>
                            }
                        >
                            <h3 className="vertical-timeline-element-title">{league.name}</h3>
                            <h5 className="vertical-timeline-element-subtitle">{serie.full_name}</h5>

                            <div className="column-align mb-5px">
                                <h5 className="vertical-timeline-element-subtitle name-of-tournament tournament-data light-white">
                                    <FontAwesomeIcon icon={faCalendarDay} /> {date}
                                </h5>
                                <span className="vertical-timeline-element-subtitle name-of-tournament tournament-data">
                                    {name}
                                </span>
                                <span className="tournament-data">
                                    Tier: <span className="font-gilroy-bold">{serie.tier}</span>
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
                                            key={team.id}
                                        >
                                            <div className="icon-container">
                                                <div className="team-icon">
                                                    <ProgressiveImage
                                                        src={team.image_url === null ? nopic : team.image_url}
                                                        placeholder={loader}
                                                    >
                                                        {(src) => (
                                                            <img src={src} className="team-logo-timeline" alt="team" />
                                                        )}
                                                    </ProgressiveImage>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="no-team-container">Teams to be defined</div>
                                )}
                            </div>
                            <div className="mobile light-white">
                                <span className="vertical-timeline-element-subtitle name-of-tournament tournament-data">
                                    {name}
                                </span>
                                <span className="tournament-data">
                                    Tier: <span className="font-gilroy-bold">{serie.tier}</span>
                                </span>
                            </div>
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>
        </div>
    ) : (
        <Loader />
    );
};

export default Timeline;
