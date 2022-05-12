import React from 'react';
import doctor from '../../assets/images/doctor.png';
import appointment from '../../assets/images/appointment.png';
import Button from '../Shared/Button';

const MakeAppointment = () => {
    return (
        <section className='flex justify-center items-center' style={{
            background: `url(${appointment})`
        }}>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-150px]' src={doctor} alt="doctorImg" />
            </div>
            <div className='flex-1 p-4'>
                <h3 className='text-primary text-xl font-bold'>Appointment</h3>
                <h2 className='text-3xl text-white py-3'>Make an appointment today</h2>
                <p className='text-white pb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis debitis tenetur id rerum doloribus iste, quis corrupti porro nesciunt culpa similique amet magnam quo earum exercitationem quam, dicta consequatur provident dignissimos eos obcaecati doloremque totam numquam repellendus? Nam, doloribus asperiores?</p>
                <Button>Get started</Button>
            </div>
        </section>
    );
};

export default MakeAppointment;