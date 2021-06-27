import React, { useEffect, useState } from "react";
import { NEWS } from "../../constants/ApiEndpoints";
import { useHistory } from "react-router";
import { ERROR } from "../../routes/routes";
import Loader from "../Loader/Loader";
import Moment from "moment";
import axios from "axios";
import "./News.css";

const News = () => {
    const history = useHistory();
    const [news, setSetNews] = useState([]);

    useEffect(() => {
        (async () => {
            const config = {
                method: "get",
                url: NEWS,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            };
            const resNews = await axios(config);
            resNews.status !== 200 && history.push(ERROR);
            setSetNews(resNews.data);
        })();
    }, []);

    return news.length !== 0 ? (
        <div className="news-container font-gilroy background-color-4all">
            {news.map((n) => {
                const dayuser = new Date().getDate();
                const day = Moment(n.time).format("DD");
                const date =
                    parseInt(day) === parseInt(dayuser)
                        ? "Today " + Moment(n.date).format("- HH:mm")
                        : Moment(n.date).format("MMM, DD - YYYY");
                return (
                    <div
                        className={`new animate__faster animate__fadeInDown ${
                            JSON.parse(localStorage.getItem("animations")) !== false && "animate__animated"
                        }`}
                        key={n.title}
                    >
                        <h1>{n.title}</h1>
                        <h2>
                            <hr />
                            {date}
                            <hr />
                        </h2>
                        <p>
                            {n.description}
                            <a rel="noopener noreferrer" target="_blank" href={n.link}>
                                {" "}
                                Full story on hltv.org
                            </a>
                        </p>
                    </div>
                );
            })}
        </div>
    ) : (
        <Loader />
    );
};

export default News;
