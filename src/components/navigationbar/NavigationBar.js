import React, { useEffect, useState } from "react";
import {
    faCalendarAlt,
    faTrophy,
    faUserFriends,
    faBars,
    faChevronLeft,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { HOME, TOURNAMENTS, MORE, TIMELINE, ALLMATCHES, NEWS, RANKING, ABOUT, CONTACT } from "../../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, Link, useHistory } from "react-router-dom";
import "./navigationbar.css";

const NavigationBar = () => {
    const { pathname } = useLocation();
    const { goBack } = useHistory();
    const [showbackbutton, setShowBackButton] = useState(false);
    const IN_ROUTE_COLOR = "#d9ad43";

    useEffect(() => {
        switch (pathname) {
            case NEWS:
                setShowBackButton(true);
                break;
            case RANKING:
                setShowBackButton(true);
                break;
            case ABOUT:
                setShowBackButton(true);
                break;
            case CONTACT:
                setShowBackButton(true);
                break;
            default:
                setShowBackButton(false);
                break;
        }
    }, [pathname]);

    return (
        <div
            className="menu-mobile"
            style={{ paddingLeft: showbackbutton && "30px" }}
            onContextMenu={(e) => (window.innerWidth > 1024 ? null : e.preventDefault())}
        >
            {showbackbutton && (
                <div className="back-btn" onClick={() => goBack()}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            )}

            <Link to={HOME}>
                <FontAwesomeIcon
                    style={{
                        color: pathname !== HOME ? "white" : IN_ROUTE_COLOR,
                    }}
                    icon={faUserFriends}
                />
            </Link>

            <Link to={TOURNAMENTS}>
                <FontAwesomeIcon
                    style={{
                        color: pathname !== TOURNAMENTS ? "white" : IN_ROUTE_COLOR,
                    }}
                    icon={faTrophy}
                />
            </Link>

            <Link to={MORE} style={{ zIndex: "5" }}>
                <FontAwesomeIcon
                    style={{
                        color: pathname !== MORE ? "white" : IN_ROUTE_COLOR,
                    }}
                    icon={faBars}
                />
            </Link>

            <Link to={TIMELINE}>
                <FontAwesomeIcon
                    style={{
                        color: pathname !== TIMELINE ? "white" : IN_ROUTE_COLOR,
                    }}
                    icon={faCalendarAlt}
                />
            </Link>

            <Link to={ALLMATCHES}>
                <FontAwesomeIcon
                    style={{
                        color: pathname !== ALLMATCHES ? "white" : IN_ROUTE_COLOR,
                    }}
                    icon={faPlay}
                />
            </Link>
        </div>
    );
};

export default NavigationBar;
