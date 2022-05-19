import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddDoctors = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

    const imageStorageKey = '8b4250e36bd3e7b35425212c00494dc4';

    /**
     * 3 ways to store image
     * 1.store image on third party like imgBB
     * 2. store image on your own server 
     * 3.store image on database like mongodb
     * 
     YUP: validate file : search yup file validation for react hook form

     */

    const onSubmit = async (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: img
                    }
                    //send to your database
                }

            })


    };
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-2xl'>Add a Doctors</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is required'
                            }
                        }
                        )}
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid email'
                            }
                        }
                        )}
                        type="email"
                        name="email"
                        placeholder="Your email"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register("specialty")} className="select input-bordered w-full max-w-xs">
                        {
                            services.map(service => <option key={service._id} value={service.name}>{service.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is required'
                            }
                        }
                        )}
                        type="file"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                    </label>
                </div>



                <input type="submit" className='btn w-full max-w-xs ' value="Add" />
            </form>
        </div>
    );
};

export default AddDoctors;