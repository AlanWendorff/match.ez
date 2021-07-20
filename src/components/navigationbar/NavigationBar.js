import React, { useEffect, useState } from "react";
import {
    faCalendarAlt,
    faTrophy,
    faBars,
    faChevronLeft,
    faPlay,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { HOME, TOURNAMENTS, MORE, TIMELINE, ALLMATCHES, NEWS, RANKING, ABOUT, CONTACT } from "../../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, Link, useHistory } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
    const { pathname } = useLocation();
    const { goBack } = useHistory();
    const [showbackbutton, setShowBackButton] = useState(false);

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
        <div className="menu-container">
            <div className="menu-mobile">
                {showbackbutton && (
                    <div className="back-btn cursor-pointer animate-fade-in-left-to-right" onClick={() => goBack()}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                )}

                <Link className={`${pathname === HOME ? "option-selected" : "option-disabled"}`} to={HOME}>
                    <FontAwesomeIcon icon={faUsers} />
                </Link>

                <Link className={`${pathname === TOURNAMENTS ? "option-selected" : "option-disabled"}`} to={TOURNAMENTS}>
                    <FontAwesomeIcon icon={faTrophy} />
                </Link>

                <Link className={`${pathname === MORE ? "option-selected" : "option-disabled"}`} to={MORE}>
                    <FontAwesomeIcon icon={faBars} />
                </Link>

                <Link className={`${pathname === TIMELINE ? "option-selected" : "option-disabled"}`} to={TIMELINE}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </Link>

                <Link className={`${pathname === ALLMATCHES ? "option-selected" : "option-disabled"}`} to={ALLMATCHES}>
                    <FontAwesomeIcon icon={faPlay} />
                </Link>
            </div>
        </div>
    );
};

export default NavigationBar;
