import React from 'react';
import { useForm } from "react-hook-form";

const AddDoctors = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        console.log("data", data);

    };

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
                    <input
                        {...register("specialty", {
                            required: {
                                value: true,
                                message: 'Specialty is required'
                            },
                        }
                        )}
                        type="text"
                        name="specialty"
                        placeholder=" specialty"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                        {errors.specialty?.type === 'required' && <span className="label-text-alt text-red-500">{errors.specialty.message}</span>}
                    </label>
                </div>

                <input type="submit" className='btn w-full max-w-xs ' value="Add" />
            </form>
        </div>
    );
};

export default AddDoctors;