import React from 'react';
import chair from '../../assets/images/chair.png';
import Button from '../Shared/Button';
import './Banner.css';

const Banner = () => {
    return (
        <div className="hero min-h-screen bg-local background-image" >
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Your new smile starts here</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Button>Get Starts</Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;