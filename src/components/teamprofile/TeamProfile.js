import React, { useEffect, useState, useContext, Suspense } from "react";
import { useParams, useHistory } from "react-router";
import { PaletteContext } from "../Context/PaletteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { HOME } from "../../routes/routes";
import MobileHeader from "../MobileHeader/MobileHeader";
import TeamPreview from "../TeamPreview/TeamPreview";
import LoadScreen from "../Loader/LoadScreen";
import Logo from "../NavigationBar/Logo";
//import generic_team_pattern from "../../Images/generic_team_pattern.png";
import csgoLogoDefault from "../../Images/csgoLogoDefault.png";
import axios from "axios";
import "../../styles/base.css";

const OneTeamMapping = React.lazy(() =>
  import("../OneTeamCard/OneTeamMapping")
);
const InfoCard = React.lazy(() => import("../InfoCard/InfoCard"));
const CircularTournaments = React.lazy(() =>
  import("../CircularTournaments/CircularTournaments")
);
const HistoricMatchMapping = React.lazy(() =>
  import("../HistoricMatchCard/HistoricMatchMapping")
);
const Warning = React.lazy(() => import("../Warning/Warning"));

const TeamProfile = () => {
  const { teamid } = useParams();
  const history = useHistory();
  !teamid && history.push(HOME);

  let backgroundStyle = [];
  const { palette, setPalette, setLogo } = useContext(PaletteContext);
  const [loaderprogress, guardarLoaderProgress] = useState({ width: "0%" });
  const [stadistics, setStadistics] = useState([]);
  const [prevMatch, guardarPrevMatch] = useState([]);
  const [matchesmod, guardarMatchesMod] = useState([]);
  const [matches, guardarMatches] = useState([]);
  const [playerscore, setPlayerScore] = useState([]);
  const [roster, setRoster] = useState([]);
  const [b64Logo, guardarB64Logo] = useState("");
  const [crash, guardarStateCrash] = useState(false);
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
    let arrayLimit =
      matchesmod.length === 6
        ? Math.round(prevMatch.length / 2)
        : prevMatch.length;
    guardarMatchesMod(prevMatch.slice(0, arrayLimit));
  };

  const toDataURL = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  };

  const filterByTournament = (name) => {
    const arrmatches = show === "vs" ? matches : prevMatch;
    const matchesFiltered = arrmatches.filter(
      (match) => match.league.name === name
    );
    show === "vs"
      ? guardarMatches(matchesFiltered)
      : guardarPrevMatch(matchesFiltered);
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
    setPreview();
    guardarLoaderProgress({ width: "0%" });
    guardarNoMatches(false);
    guardarStateCrash(false);

    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
//http://localhost:5000 https://arg-matchez-backend.herokuapp.com
    axios
      .get(
        `http://localhost:5000/api/teaminfo/${teamid}`,
        config
      )
      .then(({ data }) => {
        const {
          historicMatches,
          upcomingMatches,
          roster,
          winStrike,
          winRate,
          wl,
          imageTeam,
          colors,
        } = data;
        guardarLoaderProgress({ width: "30%" });
        setRoster(roster);
        if (historicMatches && historicMatches.length !== 0) {
          guardarMatchesMod(historicMatches.slice(0, 6));
          guardarPrevMatch(historicMatches);
          setPalette(colors);
          if (imageTeam === null) {
            setImageTeam(csgoLogoDefault);
            setLogo("");
          } else {
            setLogo(setLogo);
            setImageTeam(imageTeam);
          }
          guardarLoaderProgress({ width: "70%" });
        } else {
          guardarPrevMatch("no-match");
        }
        upcomingMatches.length !== 0 && guardarMatches(upcomingMatches);
        setStadistics({ winStrike, winRate, wl });
        guardarLoaderProgress({ width: "100%" });
      })
      .catch(() => {
        guardarStateCrash(true);
        guardarLoaderProgress({ width: "100%" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamid]);

  /* if (image_url !== csgoLogoDefault) {
    toDataURL(image_url, function (dataUrl) {
      guardarB64Logo(dataUrl);
    });
  } */
  if (image_url !== csgoLogoDefault) {
    backgroundStyle = {
      //backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1280" height="1280"><image width="400" height="400" xlink:href="${b64Logo}" /></svg>')`,
      backgroundColor: `${palette.DarkVibrant}`,
    };
  } else {
    backgroundStyle = {
      backgroundColor: `${palette.DarkMuted}`,
      //backgroundImage: `url(${generic_team_pattern})`,
    };
  }

  const { width } = loaderprogress;
  if (!crash) {
    if (width === "100%") {
      return (
        <div
          onContextMenu={(e) =>
            window.innerWidth > 782 ? null : e.preventDefault()
          }
          className="parametros-container mosaico noselect"
          style={backgroundStyle}
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

          {show === "preview" && stadistics.winStrike !== undefined && (
            <TeamPreview
              img={image_url}
              teamid={teamid}
              color={palette}
              matches={matches}
              prevMatch={prevMatch}
              setPreview={setPreview}
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
              <CircularTournaments
                filterByTournament={filterByTournament}
                matches={matches}
              />
              <OneTeamMapping matches={matches} teamid={teamid} />
            </Suspense>
          )}

          {show === "history" && prevMatch !== "no-match" && (
            <>
              <Suspense fallback={<div></div>}>
                <CircularTournaments
                  filterByTournament={filterByTournament}
                  prevMatch={prevMatch}
                />
                <HistoricMatchMapping
                  prevMatch={matchesmod}
                  teamid={teamid}
                  setPlayerScore={setPlayerScore}
                  playerscore={playerscore}
                />
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
          <Logo color={palette} img={image_url} />
        </div>
      );
    } else {
      // RETURN APP LOADING
      return (
        <div
          onContextMenu={(e) =>
            window.innerWidth > 782 ? null : e.preventDefault()
          }
          className="parametros-container mosaico noselect"
          style={{ backgroundColor: "black" }}
        >
          <LoadScreen loaderprogress={loaderprogress} />
        </div>
      );
    }
  } else {
    return (
      <div
        onContextMenu={(e) =>
          window.innerWidth > 782 ? null : e.preventDefault()
        }
        className="parametros-container mosaico noselect"
        style={{ backgroundColor: "#040c1c" }}
      >
        <Suspense fallback={<div></div>}>
          <Warning />
        </Suspense>
      </div>
    );
  }
};

export default TeamProfile;
