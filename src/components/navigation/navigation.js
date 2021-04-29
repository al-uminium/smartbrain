import React from 'react';
import './navigation.css'

const Navigation = () => {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className="f3 link dim black underline pa3 pointer nav">Sign Out</p>
        </nav>
    );
}

export default Navigation