import React, { useState, Fragment, useEffect } from 'react';
import Search from '../searchteam/Search';
import TeamCollection from '../teamcollection/TeamCollection';
import './home.css';

const Home = () => {
    const [collection, setCollection] = useState([]);
    return ( 
        <div className="home">
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