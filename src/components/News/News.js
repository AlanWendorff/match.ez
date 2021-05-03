import React, { useContext, useEffect, useState } from "react";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import LoadScreen from "../Loader/LoadScreen";
import Warning from "../Warning/Warning";
import Moment from "moment";
import axios from "axios";
import "./news.css";

const News = () => {
  const { colors } = useContext(ColorThemeContext);
  const [news, setSetNews] = useState([]);
  const [badfetch, setBadfetch] = useState(false);

  useEffect(() => {
    (async () => {
      const url = "https://arg-matchez-backend.herokuapp.com/api/news";
      try {
        const config = {
          method: "get",
          url: url,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        };
        const resNews = await axios(config);
        const objNews = resNews.data;
        if (resNews.status !== 200) {
          setBadfetch(true);
        } else {
          setSetNews(objNews);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return colors.background_color !== undefined ? (
    !badfetch ? (
      <div
        className="news-container font-gilroy"
        style={{ backgroundColor: colors.background_color }}
      >
        {news.length > 0 ? (
          news.map((n) => (
            <div
              className={`new animate__faster animate__fadeInDown ${
                JSON.parse(localStorage.getItem("animations")) !== false &&
                "animate__animated"
              }`}
              key={n.title}
            >
              <h1>{n.title}</h1>
              <h2>
                <hr />
                {Moment(n.time).format("MMM, DD - YYYY")}
                <hr />
              </h2>
              <p>{n.description}</p>
              <span>
                <hr />
                <a rel="noopener noreferrer" target="_blank" href={n.link}>
                  You can read more on: HLTV.org Post
                </a>
                <hr />
              </span>
            </div>
          ))
        ) : (
          <LoadScreen />
        )}
      </div>
    ) : (
      <div
        className="news-container font-gilroy"
        style={{ backgroundColor: colors.background_color }}
      >
        <Warning />
      </div>
    )
  ) : (
    <SimpleLoadScreen />
  );
};

export default News;
