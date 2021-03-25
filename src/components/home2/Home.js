import React, { useState, Fragment, useEffect, useContext } from 'react';
import Search from '../searchteam/Search';
import { ColorThemeContext } from '../context/ColorThemeContext';
import TeamCollection from '../teamcollection/TeamCollection';
import './home.css';

const Home = () => {
    const { colors } = useContext(ColorThemeContext);
    const [collection, setCollection] = useState([]);
    return ( 
        <div className="home font-gilroy" style={{backgroundColor: colors.background_color}}>
            <Search
                setCollection={setCollection}
                collection={collection}
            />
            <TeamCollection
                collection={collection}
            />
        </div>
     );
}
 
export default Home;