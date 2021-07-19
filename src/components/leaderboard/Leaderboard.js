import React from "react";
import { faTrophy, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressiveImage from "react-progressive-image";
import nopic from "../../assets/images/placeholder/nopic.png";
import loader from "../../assets/images/placeholder/loader.gif";
import "./Leaderboard.css";

const Leaderboard = ({ leaderboard }) =>
    leaderboard &&
    leaderboard.length > 0 && (
        <div className="ladder transition-effect font-gilroy">
            <div className="columns-ladder">
                <div>
                    <span className="text-align-start number">#</span>
                    <span className="text-align-start teams">
                        <FontAwesomeIcon className="margin-right-2percent" icon={faUserFriends} />
                        Teams:
                    </span>
                </div>

                <span className="text-align-start matches-won">
                    <FontAwesomeIcon className="margin-right-2percent" icon={faTrophy} />
                    Matches won:
                </span>
            </div>

            {leaderboard.map((team, index) => (
                <div
                    className="ladder-team animate-fade-in-top-to-bottom"
                    key={team.name}
                >
                    <div>
                        <div className="mini-ranking">{index + 1}</div>
                        <ProgressiveImage src={team.img === null ? nopic : team.img} placeholder={loader}>
                            {(src) => <img alt="laderboard team" src={src} />}
                        </ProgressiveImage>
                        <span>{team.name}</span>
                    </div>
                    <span className="font-gilroy-bold">{team.points}</span>
                </div>
            ))}
        </div>
    );

export default Leaderboard;
