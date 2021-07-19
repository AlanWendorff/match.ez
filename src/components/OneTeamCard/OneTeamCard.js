import React, { useContext } from "react";
import { LOOKPROFILE, LOOKMATCHES } from "../../titles/TitleTag";
import { faClock, faCodeBranch, faTrophy, faMedal } from "@fortawesome/free-solid-svg-icons";
import { PaletteContext } from "../Context/PaletteContext";
import { TEAM } from "../../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlaySound } from "../../utility/PlaySound";
import { Link } from "react-router-dom";
import ProgressiveImage from "react-progressive-image";
import Share from "../Share/Share";
import Moment from "moment";
import nopic from "../../assets/images/placeholder/nopic.png";
import toBeDefined from "../../assets/images/placeholder/toBeDefined.png";
import MatchCardRow from "../MatchCardRow/MatchCardRow";
import "./OneTeamCard.css";

const OneTeamCard = ({ match, teamid }) => {
    const { palette } = useContext(PaletteContext);
    const { opponents, league, begin_at, stage, serie, bestOf, tournament, status, official_stream_url, results } =
        match;
    let ownName;
    let opponentLogo, opponentName, opponentId;
    let hoy = "";
    let statusStream = "Streaming off";
    const diaUsuario = new Date().getDate();
    let diaMatch = parseInt(Moment(begin_at).format("D"));
    const colorLeague = league.colors;

    for (let index = 0; index < opponents.length; index++) {
        if (opponents[index] !== false) {
            if (opponents[index].opponent.id !== parseInt(teamid)) {
                opponentLogo = !opponents[index].opponent.image_url ? nopic : opponents[index].opponent.image_url;
                opponentName = opponents[index].opponent.name;
                opponentId = opponents[index].opponent.id;
            } else {
                ownName = opponents[index].opponent.name;
            }
        } else {
            opponentLogo = toBeDefined;
        }
    }

    if (diaUsuario === diaMatch) {
        hoy = "Today";
    }

    const Facebook = `${
        opponentName === undefined ? "To be defined" : opponentName
    } VS ${ownName} | ${bestOf} | ${Moment(begin_at).format("Do")} ${Moment(begin_at).format("MMMM - H:mm")} hs ${
        league.name + " " + serie.full_name
    }`;

    const Twitter = `${
        opponentName === undefined ? "To be defined" : opponentName
    } VS ${ownName} | ${bestOf} | ${Moment(begin_at).format("Do")} ${Moment(begin_at).format("MMMM - H:mm")} hs | ${
        league.name + " " + serie.full_name
    }`;

    const Wapp = `${opponentName === undefined ? "To be defined" : opponentName} VS ${ownName} | ${bestOf} | ${Moment(
        begin_at
    ).format("Do")} ${Moment(begin_at).format("MMMM - H:mm")} hs | ${league.name + " " + serie.full_name} -> ${
        window.location.href
    }`;

    if (status === "running") {
        return <MatchCardRow match={match} />;
    } else {
        return (
            <div
                className="col s12 m7 posicion-tarjeta font-gilroy animate-fade-in-top-to-bottom"
            >
                <div className="card horizontal tamano-tarjeta-one-team">
                    <Link
                        className="card-image"
                        to={opponentName !== undefined ? TEAM.replace(":teamid", opponentId) : "/"}
                    >
                        <div className="logo-canvas">
                            <ProgressiveImage src={opponentLogo} placeholder={nopic}>
                                {(src) => (
                                    <img
                                        title={
                                            opponentName !== undefined ? LOOKPROFILE + opponentName : "To be defined"
                                        }
                                        alt="versus team"
                                        className="team-logo"
                                        src={src}
                                    />
                                )}
                            </ProgressiveImage>
                        </div>

                        <span className="text-align-center">
                            {opponentName === undefined ? "To be defined" : opponentName}
                        </span>
                    </Link>

                    <div className="card-stacked">
                        <div className="card-content">
                            <div className="display-flex cursor-default font-size text-align-start">
                                <span className="text-align-start" style={{ color: colorLeague.DarkVibrant }}>
                                    <FontAwesomeIcon icon={faMedal} />
                                </span>
                                {league.name + " " + serie.full_name}
                            </div>

                            <div className="display-flex cursor-default font-size">
                                <span className="text-align-start" style={{ color: colorLeague.DarkVibrant }}>
                                    <FontAwesomeIcon icon={faCodeBranch} />
                                </span>
                                {stage}
                            </div>

                            <div className="display-flex cursor-default font-size">
                                <span className="text-align-start" style={{ color: colorLeague.DarkVibrant }}>
                                    <FontAwesomeIcon icon={faClock} />
                                </span>
                                <span style={{ color: hoy !== "" && colorLeague.DarkVibrant }}>
                                    {hoy === ""
                                        ? `${Moment(begin_at).format("Do")} ${Moment(begin_at).format(
                                              "MMMM - H:mm"
                                          )} hs`
                                        : `${hoy} ${Moment(begin_at).format("H:mm")} hs`}
                                </span>
                            </div>

                            <div className="display-flex cursor-default font-size">
                                <span className="text-align-start" style={{ color: colorLeague.DarkVibrant }}>
                                    {bestOf.includes("1") && <FontAwesomeIcon icon={faTrophy} />}
                                    {bestOf.includes("2") && (
                                        <>
                                            <FontAwesomeIcon icon={faTrophy} />
                                            <FontAwesomeIcon icon={faTrophy} />
                                        </>
                                    )}
                                    {bestOf.includes("3") && (
                                        <>
                                            <FontAwesomeIcon icon={faTrophy} />
                                            <FontAwesomeIcon icon={faTrophy} />
                                        </>
                                    )}
                                    {bestOf.includes("5") && (
                                        <>
                                            <FontAwesomeIcon icon={faTrophy} />
                                            <FontAwesomeIcon icon={faTrophy} />
                                            <FontAwesomeIcon icon={faTrophy} />
                                        </>
                                    )}
                                </span>
                                {bestOf}
                                {bestOf.includes("2") && " (match may end in a draw)"}
                            </div>
                            <Share Facebook={Facebook} Twitter={Twitter} Wapp={Wapp} />
                        </div>

                        <div
                            className="card-action padding-streaming-box font-gilroy text-align-center"
                            style={{ color: palette.DarkVibrant }}
                        >
                            {statusStream}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default OneTeamCard;
