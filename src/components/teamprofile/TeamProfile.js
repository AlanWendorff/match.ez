import React, { useEffect, useState, useContext, Suspense, lazy } from "react";
import { useParams, useHistory } from "react-router";
import { PaletteContext } from "../Context/PaletteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ERROR } from "../../routes/routes";
import { TEAM_INFO } from "../../routes/ApiEndpoints";
import MobileHeader from "../MobileHeader/MobileHeader";
import TeamPreview from "../TeamPreview/TeamPreview";
import LoadScreen from "../Loader/LoadScreen";
import nopic from "../../Images/nopic.png";
import axios from "axios";
import "../../styles/base.css";

const OneTeamMapping = lazy(() => import("../OneTeamCard/OneTeamMapping"));
const InfoCard = lazy(() => import("../InfoCard/InfoCard"));
const CircularTournaments = lazy(() => import("../CircularTournaments/CircularTournaments"));
const HistoricMatchMapping = lazy(() => import("../HistoricMatchCard/HistoricMatchMapping"));

const TeamProfile = () => {
    const { teamid } = useParams();
    const history = useHistory();

    const { palette, setPalette, setLogo } = useContext(PaletteContext);
    const [stadistics, setStadistics] = useState({});
    const [prevMatch, guardarPrevMatch] = useState([]);
    const [matchesmod, guardarMatchesMod] = useState([]);
    const [matches, guardarMatches] = useState([]);
    const [roster, setRoster] = useState([]);
    const [noMatches, guardarNoMatches] = useState(false);
    const [image_url, setImageTeam] = useState("");
    const [show, setShow] = useState();
    const [buttonstatus, setButtonStatus] = useState({
        preview: true,
        vs: false,
        history: false,
        ladder: false,
    });

    const loadMoreItems = () => {
        let arrayLimit = matchesmod.length === 6 ? Math.round(prevMatch.length / 2) : prevMatch.length;
        guardarMatchesMod(prevMatch.slice(0, arrayLimit));
    };

    const filterByTournament = (name) => {
        const arrmatches = show === "vs" ? matches : prevMatch;
        const matchesFiltered = arrmatches.filter((match) => match.league.name === name);
        show === "vs" ? guardarMatches(matchesFiltered) : guardarPrevMatch(matchesFiltered);
    };

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

    const setPreview = () => {
        window.scrollTo(0, 0);
        setButtonStatus({
            vs: false,
            history: false,
            ladder: false,
            preview: true,
        });
        setShow("preview");
    };

    useEffect(() => {
        setImageTeam("");
        setPreview();
        guardarNoMatches(false);

        const config = {
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
        axios
            .get(TEAM_INFO.replace(":id", teamid), config)
            .then(({ data }) => {
                const { historicMatches, upcomingMatches, roster, winStrike, winRate, wl, imageTeam, colors, status } =
                    data;
                status !== 200 && history.push(ERROR);
                setRoster(roster);
                setStadistics({ winStrike, winRate, wl });
                upcomingMatches.length !== 0 && guardarMatches(upcomingMatches);
                if (historicMatches && historicMatches.length !== 0) {
                    guardarMatchesMod(historicMatches.slice(0, 6));
                    guardarPrevMatch(historicMatches);
                    setPalette(colors);
                    if (imageTeam === null) {
                        setImageTeam(nopic);
                        setLogo("");
                    } else {
                        setLogo(setLogo);
                        setImageTeam(imageTeam);
                    }
                } else {
                    guardarPrevMatch("no-match");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [teamid]);

    return image_url ? (
        <div
            className="parametros-container noselect background-color-4all"
            style={{ backgroundColor: palette.DarkVibrant }}
        >
            <MobileHeader
                color={palette}
                img={image_url}
                buttonstatus={buttonstatus}
                setPreview={setPreview}
                setVs={setVs}
                setHistory={setHistory}
                isProfile
                setLadder
            />

            {show === "preview" && (
                <TeamPreview
                    img={image_url}
                    teamid={teamid}
                    color={palette}
                    matches={matches}
                    prevMatch={prevMatch}
                    setVs={setVs}
                    setHistory={setHistory}
                    roster={roster}
                    winRate={stadistics.winRate}
                    winStrike={stadistics.winStrike}
                    wl={stadistics.wl}
                />
            )}
            {show === "vs" && !matches.length > 0 && (
                <Suspense fallback={<div></div>}>
                    <InfoCard noMatches={noMatches} />
                </Suspense>
            )}
            {show === "vs" && matches.length > 0 && (
                <Suspense fallback={<div></div>}>
                    <CircularTournaments filterByTournament={filterByTournament} matches={matches} />
                    <OneTeamMapping matches={matches} teamid={teamid} />
                </Suspense>
            )}

            {show === "history" && prevMatch !== "no-match" && (
                <>
                    <Suspense fallback={<div></div>}>
                        <CircularTournaments filterByTournament={filterByTournament} prevMatch={prevMatch} />
                        <HistoricMatchMapping prevMatch={matchesmod} teamid={teamid} />
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
                    </Suspense>
                </>
            )}
            {/* <Logo color={palette} img={image_url} /> */}
        </div>
    ) : (
        <div className="parametros-container noselect">
            <LoadScreen />
        </div>
    );
};

export default TeamProfile;
