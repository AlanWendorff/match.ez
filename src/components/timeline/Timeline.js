import React, {useEffect, useState, useContext} from 'react';
import Moment from 'moment';
import shortid from 'shortid';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import csgoLogoDefaultBlack from '../../ImagenesVarias/csgoLogoDefaultBlack.png';
import toBeDefined from '../../ImagenesVarias/toBeDefined.png';
import Warning from '../warning/Warning';
import LoadScreen from '../loader/LoadScreen';
import { getTimeline } from './getTimeline';
import { Link } from 'react-router-dom';
import {momentSpanishSetup} from '../../utility/MomentSpanishSetup';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { ColorThemeContext } from '../context/ColorThemeContext';
import 'react-vertical-timeline-component/style.min.css';
import './timeline.css'
const Timeline = () => {
    momentSpanishSetup();
    const { colors } = useContext(ColorThemeContext);
    const [time, setTime] = useState([]);
    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [length, guardarlength] = useState(false);  
    //const dateUser = Moment(Date.now()).format("MM-DD-YYYY");
    //data.filter(date => date.begin_at !== null)

    useEffect(() => { 
        (async () => {
            if (!time.length > 0) {
                const {objTime, badFetch} = await getTimeline();
                if (objTime) {
                    guardarLoaderProgress({width: '100%'});
                    setTime(objTime);
                    if(objTime.length === 0){   
                        guardarlength(true);
                    }
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
                    <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="timeline-background time-line-container font-gilroy" style={{backgroundColor: colors.background_color}}>
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
                                            icon={<Link to={`/${league.slug}`} title={`Click para Ver los Próximos partidos de la ${league.name}`}><img className="tournament-logo-timeline" src={league.image_url}/></Link>}
                                            >
                                            <h3 className="vertical-timeline-element-title">{league.name}</h3>
                                            <h5 className="vertical-timeline-element-subtitle">{serie.full_name}</h5>
                                            {prizepool !== null?
                                                <div className="column-align mb-5px">
                                                    <span className="vertical-timeline-element-subtitle name-of-tournament tournament-data">{name}</span>
                                                    <span className="tournament-data">Tier: <span className="font-gilroy-bold">{serie.tier}</span></span>
                                                    <span className="tournament-data">Prizepool: <span className="font-gilroy-bold">{prizepool}</span></span>
                                                </div>
                                            :   
                                                <div className="column-align mb-5px">
                                                    <span className="vertical-timeline-element-subtitle name-of-tournament tournament-data">{name}</span>
                                                    <span className="tournament-data">Tier: <span className="font-gilroy-bold">{serie.tier}</span></span>
                                                </div>
                                            }
                                            
                                            
                                            <div className="teams-in-tournament">
                                                {teams.length > 1?
                                                    teams.map((team) => (
                                                        <Link to={`/${team.slug}`} title={`Click para Ver el Perfil de ${team.name}`} key={shortid.generate()}>
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
                                        </VerticalTimelineElement>
                                    );                                  
                                })
                            }
                        </VerticalTimeline>
                    </div> 
                 );
            }else{
                return(
                    <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="timeline-background time-line-container" style={{backgroundColor: colors.background_color}}>
                        <LoadScreen
                            loaderprogress={loaderprogress}
                        /> 
                    </div>
                );
            }
        }else{
            return(
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="timeline-background time-line-container" style={{backgroundColor: colors.background_color}}>
                    <Warning/>
                </div>
            );
        }
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="timeline-background time-line-container" style={{backgroundColor: 'black'}}>
                <SimpleLoadScreen/>
            </div>
        );
    };
   
}
 
export default Timeline;