import React, { useEffect, useState, useContext, lazy } from "react";
import { useParams, useHistory } from "react-router";
import { PaletteContext } from "../Context/PaletteContext";
import { ERROR } from "../../routes/routes";
import { LEAGUE_INFO } from "../../constants/ApiEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HistoricMatchMapping from "../HistoricMatchCard/HistoricMatchMapping";
import CompetitionMapping from "../CompetitionCard/CompetitionMapping";
import MobileHeader from "../MobileHeader/MobileHeader";
import Loader from "../Loader/Loader";
import nopic from "../../assets/images/placeholder/nopic.png";
import axios from "axios";
//const TeamsAliveInTournament = lazy(() => import("../TeamsAliveInTournament/TeamsAliveInTournament"));
const Leaderboard = lazy(() => import("../Leaderboard/Leaderboard"));
const InfoCard = lazy(() => import("../InfoCard/InfoCard"));

const LeagueGames = () => {
    const { tournamentId } = useParams();
    const history = useHistory();

    const { palette, setPalette, setLogo } = useContext(PaletteContext);
    const [matchesHoy, guardarMatchesHoy] = useState([]);
    const [prevMatch, guardarPrevMatch] = useState([]);
    const [leaderboard, guardarLeaderboard] = useState([]);
    const [matchesmod, guardarMatchesMod] = useState([]);
    const [image_url, setImageLeague] = useState("");
    const [buttonstatus, setButtonStatus] = useState({
        teamsAlive: false,
        vs: true,
        history: false,
        ladder: false,
    });

    const setTeamsAlive = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: false,
            history: false,
            ladder: false,
            teamsAlive: true,
        });
    };

    const setHistory = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: false,
            history: true,
            ladder: false,
            teamsAlive: false,
        });
    };

    const setLadder = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: false,
            history: false,
            ladder: true,
            teamsAlive: false,
        });
    };

    const setVs = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: true,
            history: false,
            ladder: false,
            teamsAlive: false,
        });
    };

    const loadMoreItems = () => {
        let arrayLimit = matchesmod.length === 6 ? Math.round(prevMatch.length / 2) : prevMatch.length;
        guardarMatchesMod(prevMatch.slice(0, arrayLimit));
    };

    useEffect(() => {
        const config = {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
        axios.get(LEAGUE_INFO.replace(":id", tournamentId), config).then(({ data }) => {
            data.status !== 200 && history.push(ERROR);
            const { historicMatches, upcomingMatches, ladder, imageLeague, colors } = data;
            upcomingMatches !== undefined && guardarMatchesHoy(upcomingMatches);
            ladder !== undefined && guardarLeaderboard(ladder);
            if (historicMatches && historicMatches.length !== 0) {
                setPalette(colors);
                if (imageLeague === null) {
                    setImageLeague(nopic);
                    setLogo("");
                } else {
                    setLogo(setLogo);
                    setImageLeague(imageLeague);
                }
                guardarMatchesMod(historicMatches.slice(0, 6));
                guardarPrevMatch(historicMatches);
            } else {
                guardarPrevMatch("no-match");
            }
        });
    }, []);
    /* {buttonstatus.teamsAlive && <TeamsAliveInTournament />} */
    return image_url ? (
        <div className="height-100vh-pad-bot-90p parametros-container" style={{ backgroundColor: palette.DarkVibrant }}>
            <MobileHeader
                color={palette}
                img={image_url}
                buttonstatus={buttonstatus}
                setTeamsAlive={setTeamsAlive}
                setHistory={setHistory}
                setVs={setVs}
                setLadder={setLadder}
            />
            {buttonstatus.ladder && <Leaderboard leaderboard={leaderboard} />}
            {buttonstatus.vs && matchesHoy !== undefined && <CompetitionMapping matchesHoy={matchesHoy} />}
            {buttonstatus.vs && matchesHoy.length === 0 && <InfoCard />}
            {buttonstatus.history && prevMatch !== "no-match" && (
                <>
                    <HistoricMatchMapping prevMatch={matchesmod} />
                    {matchesmod.length !== prevMatch.length && (
                        <div
                            onClick={() => {
                                loadMoreItems();
                            }}
                            className="load-more"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    )}
                </>
            )}
        </div>
    ) : (
        <Loader />
    );
};

export default LeagueGames;
