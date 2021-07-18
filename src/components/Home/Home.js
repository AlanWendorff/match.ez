import React, { useState, useEffect } from "react";
import SearchTeam from "../SearchTeam/SearchTeam";
import TeamCollection from "../TeamCollection/TeamCollection";
import "./home.css";

const Home = () => {
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("collection")) === null) {
            localStorage.setItem("collection", JSON.stringify([]));
        }
        setCollection(JSON.parse(localStorage.getItem("collection")));
    }, []);

    return (
        <div className="height-100vh-pad-bot-90p home font-gilroy background-color-4all animate__fadeInDown animate__faster animate__animated">
            <SearchTeam setCollection={setCollection} collection={collection} />
            <TeamCollection collection={collection} />
        </div>
    );
};

export default Home;
