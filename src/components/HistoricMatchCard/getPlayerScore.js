import axios from "axios";
import { PLAYER_SCORE } from "../../constants/ApiEndpoints";

export const getPlayerScore = async (id) => {
  const url = PLAYER_SCORE.replace(":id", id);
  const config = {
    method: "get",
    url: url,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  const gameScore = await axios(config);
  return gameScore;
};
