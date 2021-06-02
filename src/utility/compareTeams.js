import { COMPARE_WIN_RATE } from "../const/ApiEndpoints";
import axios from "axios";

export const compareTeams = async (ID_1, ID_2) => {
  const IDS = ID_1 + "-" + ID_2;
  const config = {
    method: "get",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  const data = await axios.get(COMPARE_WIN_RATE.replace(":ids", IDS), config);
  return data;
};
