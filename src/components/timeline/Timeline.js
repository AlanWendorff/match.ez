import React from 'react';
import Moment from 'moment';
import shortid from 'shortid';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import { Link } from 'react-router-dom';
import {momentSpanishSetup} from '../../utility/MomentSpanishSetup';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { getStyles } from '../home/getStyles/firebaseStyles';
import 'react-vertical-timeline-component/style.min.css';
import data from './fakeData';
import './timeline.css'
const Timeline = () => {
    momentSpanishSetup();
    const styles = getStyles();
    console.log(data);
    if (styles !== undefined) {
        return ( 
            <div className="time-line-container" style={{backgroundColor: styles.background_color}}>
                <VerticalTimeline>
                    {   
                        data.map((tournament) => {
                            const {begin_at, league, serie, name, teams, prizepool} = tournament;
                            return(
                                <VerticalTimelineElement
                                    key={shortid.generate()}
                                    className="vertical-timeline-element--education"
                                    date={Moment(begin_at).format("YYYY-MM-DD    hh:mm")}
                                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                    icon={league.image_url}
                                    >
                                    <h3 className="vertical-timeline-element-title">{league.name}</h3>
                                    <h4 className="vertical-timeline-element-subtitle">{serie.full_name}</h4>
                                    <h5 className="vertical-timeline-element-subtitle">{name}</h5>
                                    <p>Tier: {serie.tier}</p>
                                    <div className="teams-in-tournament">
                                        {
                                            teams.map((team) => (
                                                <Link to={`/${team.slug}`} key={shortid.generate()}>
                                                    <div className="icon-container">
                                                        <div className="team-icon">
                                                            <img className="team-logo-timeline" title={team.name} src={team.image_url}></img>
                                                        </div>
                                                    </div>
                                                    
                                                </Link>
                                            ))
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
            <div className="time-line-container" style={{backgroundColor: 'black'}}>
                <SimpleLoadScreen/>
            </div>
        );
    };
   
}
 
export default Timeline;