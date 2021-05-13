import React, { useState } from "react";
import Team from "./Team";
import SaveInLS from "./SaveInLS";
import axios from "axios";
import "./search.css";

const SearchTeam = ({ setCollection, collection }) => {
  const [teams, setTeams] = useState([]);
  const [firstpin, setFirstPin] = useState(false);

  const BuscarEquipos = () => {
    let input = document.getElementById("icon_prefix").value.toLowerCase();
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    if (input.length !== 0) {
      axios(
        `https://arg-matchez-backend.herokuapp.com/database/searchteam/${input}`,
        config
      ).then(({ data }) => {
        data ? setTeams(data) : setTeams([]);
      });
    } else {
      setTeams([]);
    }
  };

  const SaveOnLS = () => {
    setTimeout(() => {
      localStorage.setItem("collection", JSON.stringify(collection));
    }, 100);
  };

  return (
    <div
      className={`search-container animate__fadeInDown animate__faster ${
        JSON.parse(localStorage.getItem("animations")) !== false &&
        "animate__animated"
      }`}
    >
      <div
        title="Search Team"
        className="input-field col s6 search-bar"
        onChange={() => {
          BuscarEquipos();
        }}
      >
        <i className="material-icons prefix">people_outline</i>
        <input
          id="icon_prefix"
          type="text"
          className="validate"
          autoComplete="off"
        ></input>
        <label className="color-text-black" htmlFor="icon_prefix">
          Search Teams:
        </label>
      </div>
      <div className="list-of-teams-container">
        {document.getElementById("icon_prefix")&& document.getElementById("icon_prefix").value.length > 0 &&
          teams.map((team) => (
            <Team
              key={team.id}
              team={team}
              setCollection={setCollection}
              collection={collection}
              setFirstPin={setFirstPin}
            />
          ))
        }
        <SaveInLS
          collection={collection}
          SaveOnLS={SaveOnLS}
          firstpin={firstpin}
        />
      </div>
    </div>
  );
};

export default SearchTeam;
