import React, {useEffect} from 'react';
import './loadmore.css';

const LoadMore = ({colors}) => {
    
    
    return ( 
        <div className="load-more">
            <hr/>
                <div className="load-more-btn" style={{backgroundColor: colors.header_color}} onClick={()=> {}}>
                    Load More
                </div>
            <hr/>
        </div>
     );
}
 
export default LoadMore;