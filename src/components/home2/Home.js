import React, { useState, Fragment, useEffect, useContext } from 'react';
import Search from '../searchteam/Search';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import { ColorThemeContext } from '../context/ColorThemeContext';
import TeamCollection from '../teamcollection/TeamCollection';
import './home.css';

const Home = () => {
    const { colors } = useContext(ColorThemeContext);
    const [collection, setCollection] = useState([]);
    
    return ( colors.background_color !== undefined?
        <div className="home font-gilroy" style={{backgroundColor: colors.background_color}} onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()}>
            <Search
                setCollection={setCollection}
                collection={collection}
            />
            <TeamCollection
                collection={collection}
            />
        </div>
        :
        <SimpleLoadScreen/>
     );
}
 
export default Home;