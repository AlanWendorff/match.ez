import React, {useEffect, useState, useContext} from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { faCalendarDay, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { LOOKMATCHES, LOOKPROFILE } from '../../titlestag/titlestag';
import { ColorThemeContext } from '../Context/ColorThemeContext';
import { TOURNAMENT, TEAM } from '../../routes/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTimeline } from './getTimeline';
import { Link } from 'react-router-dom';
import SimpleLoadScreen from '../Loader/SimpleLoadScreen';
import LoadScreen from '../Loader/LoadScreen';
import Warning from '../Warning/Warning';
import shortid from 'shortid';
import Moment from 'moment';
import csgoLogoDefaultBlack from '../../Images/csgoLogoDefaultBlack.png';
import toBeDefined from '../../Images/toBeDefined.png';
import 'react-vertical-timeline-component/style.min.css';
import './timeline.css'
const Timeline = () => {

    const { colors } = useContext(ColorThemeContext);
    const [time, setTime] = useState([]);
    const [loaderprogress, guardarLoaderProgress] = useState({width: '0%'});
    const [crash, guardarStateCrash] = useState(false);

    useEffect(() => { 
        (async () => {
            if (!time.length > 0) {
                const {objTime, badFetch} = await getTimeline();
                if (objTime) {
                    guardarLoaderProgress({width: '100%'});
                    setTime(objTime);
                }
                if (badFetch) {
                    guardarStateCrash(true);
                }
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const {width} = loaderprogress;
    
    if (colors !== undefined) {
        if (crash !== true){
            if(width === '100%'){
                return ( 
                    <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="time-line-container font-gilroy" style={{backgroundColor: colors.background_color}}>
                        <VerticalTimeline layout='1-column-left'>
                            {   
                                time.map((tournament) => {
                                    const {begin_at, league, serie, name, teams, prizepool} = tournament;
                                    const date = Moment(begin_at).format("DD - MMMM - HH:mm") + ' hs';
                                    return(
                                        <VerticalTimelineElement
                                            key={shortid.generate()}
                                            className="vertical-timeline-element--education"
                                            date={date}
                                            iconStyle={{border: `3px solid ${colors.header_color}`}}
                                            icon={<Link to={TOURNAMENT.replace(':tournamentId', tournament.league_id)} title={LOOKMATCHES + league.name}><img className="tournament-logo-timeline" src={league.image_url}/></Link>}
                                            >
                                            <h3 className="vertical-timeline-element-title">{league.name}</h3>
                                            <h5 className="vertical-timeline-element-subtitle">{serie.full_name}</h5>
                                            
                                            <div className="column-align mb-5px">
                                                <h5 style={{backgroundColor: `${colors.header_color}`}} className="vertical-timeline-element-subtitle name-of-tournament tournament-data"><FontAwesomeIcon icon={faCalendarDay}/> {date}</h5>
                                                <span className="vertical-timeline-element-subtitle name-of-tournament tournament-data">{name}</span>
                                                <span className="tournament-data">Tier: <span className="font-gilroy-bold">{serie.tier}</span></span>
                                                {prizepool&&
                                                    <label style={{backgroundColor: `${colors.header_color}`}} className="tournament-data"><FontAwesomeIcon icon={faMoneyCheckAlt}/> <span className="font-gilroy-bold">{prizepool}</span></label>
                                                }
                                            </div>
                                            
                                            <div className="teams-in-tournament">
                                                {teams.length > 1?
                                                    teams.map((team) => (
                                                        <Link to={TEAM.replace(':teamid', team.id)} title={LOOKPROFILE + team.name} key={shortid.generate()}>
                                                            <div className="icon-container">
                                                                <div className="team-icon">
                                                                    <img className="team-logo-timeline" src={team.image_url === null?  csgoLogoDefaultBlack : team.image_url}></img>
                                                                </div>
                                                            </div>
                                                            
                                                        </Link>
                                                    ))
                                                    :
                                                    
                                                    <div className="no-team-container">
                                                        <div className="no-team"><img className="team-logo-timeline" src={toBeDefined}/></div>
                                                        <div className="no-team"><img className="team-logo-timeline" src={toBeDefined}/></div>
                                                        <div className="no-team"><img className="team-logo-timeline" src={toBeDefined}/></div>
                                                    </div>
                                                    
                                                    
                                                }
                                            </div>
                                            <div className="mobile" style={{backgroundColor: `${colors.header_color}`}}>
                                                <span className="vertical-timeline-element-subtitle name-of-tournament tournament-data">{name}</span>
                                                <span className="tournament-data">Tier: <span className="font-gilroy-bold">{serie.tier}</span></span>
                                            </div>
                                            
                                        </VerticalTimelineElement>
                                    );                                  
                                })
                            }
                        </VerticalTimeline>
                    </div> 
                 );
            }else{
                return(
                    <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="time-line-container" style={{backgroundColor: colors.background_color}}>
                        <LoadScreen
                            loaderprogress={loaderprogress}
                        /> 
                    </div>
                );
            }
        }else{
            return(
                <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="time-line-container" style={{backgroundColor: colors.background_color}}>
                    <Warning/>
                </div>
            );
        }
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()} className="time-line-container">
                <SimpleLoadScreen/>
            </div>
        );
    };
   
}
 
export default Timeline;