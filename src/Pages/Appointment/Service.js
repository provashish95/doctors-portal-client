import React from 'react';

const Service = ({ service, setTreatment }) => {

    const { name, slots, price } = service;

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
                <p><small>Price: {price}$</small></p>
                <div className="card-actions justify-center">
                    <label
                        onClick={() => setTreatment(service)}
                        disabled={slots.length === 0}
                        htmlFor="booking-modal" className="btn btn-sm btn-secondary uppercase text-white bg-gradient-to-r from-secondary to-primary">
                        Book Appointment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Service;