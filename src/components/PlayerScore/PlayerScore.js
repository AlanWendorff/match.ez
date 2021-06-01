import React from "react";
import "./tarjetaScore.css";

const PlayerScore = ({
  playerscore,
  csgoLogoDefaultBlack,
  opponents,
  loading,
  team0,
  team1,
}) => {
  const { teams } = playerscore;
  let TeamNameA, TeamLogoA, colorTeamA;
  let TeamNameB, TeamLogoB, colorTeamB;

  if (teams && teams.length > 0) {
    for (let i = 0; i < opponents.length; i++) {
      if (playerscore.teams[0].name === opponents[0].opponent.name) {
        if (opponents[0].opponent.image_url === null) {
          TeamLogoA = csgoLogoDefaultBlack;
        } else {
          TeamLogoA = opponents[0].opponent.image_url;
        }
        if (opponents[1].opponent.image_url === null) {
          TeamLogoB = csgoLogoDefaultBlack;
        } else {
          TeamLogoB = opponents[1].opponent.image_url;
        }
        colorTeamA = team0.colors;
        colorTeamB = team1.colors;
        TeamNameA = opponents[0].opponent.name;
        TeamNameB = opponents[1].opponent.name;
      } else {
        if (opponents[1].opponent.image_url === null) {
          TeamLogoA = csgoLogoDefaultBlack;
        } else {
          TeamLogoA = opponents[1].opponent.image_url;
        }
        if (opponents[0].opponent.image_url === null) {
          TeamLogoB = csgoLogoDefaultBlack;
        } else {
          TeamLogoB = opponents[0].opponent.image_url;
        }
        colorTeamA = team1.colors;
        colorTeamB = team0.colors;
        TeamNameA = opponents[1].opponent.name;
        TeamNameB = opponents[0].opponent.name;
      }
    }
  }

  if (loading === false) {
    return teams ? (
      teams.length > 0 ? (
        <div>
          <div>
            <table>
              <thead>
                <tr
                  className="line-width font-gilroy"
                  style={{ backgroundColor: colorTeamA.DarkVibrant }}
                >
                  <th className="space color-text-black">
                    <div className="team-field">
                      <img
                        alt="a team"
                        className="table-logo-size"
                        src={TeamLogoA}
                      />
                      <span className="Team-name-score">{TeamNameA}</span>
                    </div>
                  </th>

                  <th
                    title="Kills"
                    className="text-to-end table-font-size text-align-center"
                  >
                    K
                  </th>
                  <th
                    title="Assists / Asistencias"
                    className="text-to-end table-font-size text-align-center"
                  >
                    A
                  </th>
                  <th
                    title="Deaths / Muertes"
                    className="text-to-end table-font-size text-align-center"
                  >
                    D
                  </th>
                  <th
                    title="Headshots"
                    className="text-to-end table-font-size text-align-center"
                  >
                    H
                  </th>
                  <th
                    title="Average Damage per Round / Promedio de Daño por Ronda"
                    className="text-to-end table-font-size text-align-center"
                  >
                    ADR
                  </th>
                  <th
                    title="HLTV player rating"
                    className="text-to-end table-font-size text-align-center"
                  >
                    RATING
                  </th>
                </tr>
              </thead>
              <tbody>
                {playerscore.teams[0].players
                  .sort(function (a, b) {
                    return (
                      b.stats.per_game_averages.hltv_game_rating -
                      a.stats.per_game_averages.hltv_game_rating
                    );
                  })
                  .map(({ name, first_name, last_name, stats }, index) => {
                    const { counts, per_game_averages } = stats;
                    return (
                      <tr className="line-width" key={index}>
                        <td className="space color-text-black font-bold table-font-size">
                          {first_name}
                          <span
                            style={{ color: colorTeamA.DarkVibrant }}
                            className="player-name-style"
                          >
                            "{name}"
                          </span>
                          {last_name}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {counts.kills}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {counts.assists}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {counts.deaths}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {counts.headshots}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {per_game_averages.adr}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {per_game_averages.hltv_game_rating}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div>
            <table>
              <thead>
                <tr
                  className="line-width font-gilroy"
                  style={{ backgroundColor: colorTeamB.DarkVibrant }}
                >
                  <th className="space color-text-black">
                    <div className="team-field">
                      <img
                        alt="b team"
                        className="table-logo-size"
                        src={TeamLogoB}
                      />
                      <span className="Team-name-score">{TeamNameB}</span>
                    </div>
                  </th>
                  <th
                    title="Kills"
                    className="text-to-end table-font-size text-align-center"
                  >
                    K
                  </th>
                  <th
                    title="Assists / Asistencias"
                    className="text-to-end table-font-size text-align-center"
                  >
                    A
                  </th>
                  <th
                    title="Deaths / Muertes"
                    className="text-to-end table-font-size text-align-center"
                  >
                    D
                  </th>
                  <th
                    title="Headshots"
                    className="text-to-end table-font-size text-align-center"
                  >
                    H
                  </th>
                  <th
                    title="Average Damage per Round / Promedio de Daño por Ronda"
                    className="text-to-end table-font-size text-align-center"
                  >
                    ADR
                  </th>
                  <th
                    title="HLTV player rating"
                    className="text-to-end table-font-size text-align-center"
                  >
                    RATING
                  </th>
                </tr>
              </thead>
              <tbody>
                {playerscore.teams[1].players
                  .sort(function (a, b) {
                    return (
                      b.stats.per_game_averages.hltv_game_rating -
                      a.stats.per_game_averages.hltv_game_rating
                    );
                  })
                  .map(({ name, first_name, last_name, stats }, index) => {
                    const { counts, per_game_averages } = stats;
                    return (
                      <tr className="line-width" key={index}>
                        <td className="space color-text-black font-bold table-font-size">
                          {first_name}
                          <span
                            style={{ color: colorTeamB.DarkVibrant }}
                            className="player-name-style"
                          >
                            "{name}"
                          </span>
                          {last_name}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {counts.kills}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {counts.assists}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {counts.deaths}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {counts.headshots}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {per_game_averages.adr}
                        </td>
                        <td className="text-align-center color-text-black font-bold table-font-size">
                          {per_game_averages.hltv_game_rating}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>No player stadistics for this serie {":'("}</div>
      )
    ) : null;
  } else {
    return (
      <div className="display-flex-justify-center width-100percent">
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PlayerScore;
