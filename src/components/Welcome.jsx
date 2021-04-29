import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/dogFlex.jpg';

const Welcome = () => {
    return (

        <Link to="/doginformations" style={{ textDecoration: 'none' }}>
            <img src={img} alt="dogFlex" id="welcomeBg" />
            <div id="welcomeText">
                <div>
                    <div>Welcome to</div>
                    <div>DoggyDaycare</div>
                    <div>Click anywhere to continue</div>
                </div>
            </div>
        </Link>
    )
}

export default Welcome;