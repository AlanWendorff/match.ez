import React, { useEffect, useState } from "react";
import {
    faCalendarAlt,
    faTrophy,
    faUserFriends,
    faFistRaised,
    faBars,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { HOME, TOURNAMENTS, MORE, TIMELINE, ALLMATCHES, NEWS, RANKING } from "../../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, Link } from "react-router-dom";
import "./navigationbar.css";

const NavigationBar = () => {
    const { pathname } = useLocation();
    const [lastLocation, setlastLocation] = useState(HOME);
    const IN_ROUTE_COLOR = "#d9ad43";

    useEffect(() => {
        if (pathname.includes(NEWS) || pathname.includes(RANKING)) {
            setlastLocation(MORE);
        } else {
            setlastLocation(HOME);
        }
    }, [pathname]);

    return (
        <div className="menu-mobile" style={{paddingLeft: lastLocation !== HOME && "30px"}} onContextMenu={(e) => (window.innerWidth > 1024 ? null : e.preventDefault())}>
            {lastLocation !== HOME && (
                <Link className="back-btn" to={MORE}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
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
                    icon={faFistRaised}
                />
            </Link>
        </div>
    );
};

export default NavigationBar;
