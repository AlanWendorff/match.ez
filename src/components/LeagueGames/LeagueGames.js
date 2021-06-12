import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { PaletteContext } from "../Context/PaletteContext";
import { ERROR } from "../../routes/routes";
import { LEAGUE_INFO } from "../../routes/ApiEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HistoricMatchMapping from "../HistoricMatchCard/HistoricMatchMapping";
import CompetitionMapping from "../CompetitionCard/CompetitionMapping";
import MobileHeader from "../MobileHeader/MobileHeader";
import Leaderboard from "../Leaderboard/Leaderboard";
import LoadScreen from "../Loader/LoadScreen";
import InfoCard from "../InfoCard/InfoCard";
import csgoLogoDefault from "../../Images/csgoLogoDefault.png";
import axios from "axios";

const LeagueGames = () => {
    const { tournamentId } = useParams();
    const history = useHistory();

    const { palette, setPalette, setLogo } = useContext(PaletteContext);
    const [matchesHoy, guardarMatchesHoy] = useState([]);
    const [prevMatch, guardarPrevMatch] = useState([]);
    const [leaderboard, guardarLeaderboard] = useState([]);
    const [matchesmod, guardarMatchesMod] = useState([]);
    const [image_url, setImageLeague] = useState("");
    const [show, setShow] = useState("vs");
    const [buttonstatus, setButtonStatus] = useState({
        preview: false,
        vs: true,
        history: false,
        ladder: false,
    });
    const setHistory = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: false,
            history: true,
            ladder: false,
            preview: false,
        });
        setShow("history");
    };

    const setLadder = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: false,
            history: false,
            ladder: true,
            preview: false,
        });
        setShow("ladder");
    };

    const setVs = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: true,
            history: false,
            ladder: false,
            preview: false,
        });
        setShow("vs");
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
                    setImageLeague(csgoLogoDefault);
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

    return image_url ? (
        <div className="parametros-container" style={{ backgroundColor: palette.DarkVibrant }}>
            <MobileHeader
                color={palette}
                img={image_url}
                buttonstatus={buttonstatus}
                setVs={setVs}
                setHistory={setHistory}
                setLadder={setLadder}
                setPreview
                isTournament
            />

            {show === "ladder" && <Leaderboard leaderboard={leaderboard} />}
            {show === "vs" && matchesHoy !== undefined && <CompetitionMapping matchesHoy={matchesHoy} />}

            {show === "vs" && matchesHoy.length === 0 && <InfoCard />}

            {show === "history" && prevMatch !== "no-match" && (
                <>
                    <HistoricMatchMapping prevMatch={matchesmod} setShow={setShow} />
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

            {/* <Logo color={palette} img={image_url} /> */}
        </div>
    ) : (
        <div className="parametros-container">
            <LoadScreen />
        </div>
    );
};

export default LeagueGames;
