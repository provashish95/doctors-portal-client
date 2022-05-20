import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

//from stripe.com get api key here
const stripePromise = loadStripe('pk_test_51L1Z5BKZIfiPkipfEKgq58v7TC6RQarM3MjEvf1nHXqeDq0FCNlGELI2DjBCrICTdXbd5QROsUdxbzmv9K5wdqGj00DH8sPuwV');

const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/booking/${id}`;

    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>


            <div className="card w-50  max-w-md  bg-base-100 shadow-xl my-12 mx-auto">
                <div className="card-body">
                    <p>Hello {appointment.patientName}, </p>
                    <h2 className="card-title">Please Pay for {appointment.treatmentName}</h2>
                    <p>Your Appointment:  <span className='text-orange-700'>{appointment.date}</span> at {appointment.slot}</p>
                    <p>Please Pay: {appointment.price}$</p>
                </div>
            </div>

            <div className="card flex-shrink-0  max-w-md shadow-2xl bg-base-100 mx-auto">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>

        </div>
    );
};

export default Payment;