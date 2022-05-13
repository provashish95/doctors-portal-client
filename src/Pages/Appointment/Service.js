import React from 'react';

const Service = ({ service }) => {

    const { name, slots } = service;

    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="card-title text-secondary  mx-auto">{name}</h2>
                <p>
                    {
                        slots.length
                            ? <span >{slots[0]}</span>
                            : <span className='text-red-500 text-center'>Try another day</span>
                    }
                </p>
                <p>{slots.length} Space Available</p>
                <div className="card-actions justify-center">
                    <button disabled={slots.length === 0} className="btn btn-secondary uppercase text-white">Book Appointment</button>
                </div>
            </div>
        </div>
    );
};

export default Service;