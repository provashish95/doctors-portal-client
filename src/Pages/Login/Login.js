import React, { useEffect, useRef, useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useToken from '../../hook/useToken';

const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        emailPassUser,
        emailPassLoading,
        emailPassError,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, resetSending, resetError] = useSendPasswordResetEmail(auth);
    const [isEmail, setEmail] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [token] = useToken(emailPassUser || googleUser);

    const navigate = useNavigate();
    const location = useLocation();
    let errorMassage;
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])


    if (googleLoading || emailPassLoading) {
        return <Loading></Loading>
    }
    if (googleError || emailPassError) {
        errorMassage = <p className='text-red-500'>{googleError?.message || emailPassError?.message}</p>
    }


    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)

    };

    const resetPassword = async () => {
        if (isEmail) {
            await sendPasswordResetEmail(isEmail);
            toast.success('Sent email');
        } else {
            toast.error('Please enter your email');
        }
    }

    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

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
                                onChange={onChangeEmail}
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
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                }
                                )}
                                type="password"
                                name="password"
                                placeholder="Your Password"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {errorMassage}
                        <input type="submit" className='btn w-full max-w-xs ' value="Log in" />
                    </form>
                    <p><small>Forget Password ? <button onClick={resetPassword} className='text-primary'>Reset Password</button></small></p>
                    <p><small>New to doctors portal ? <Link to="/signUp" className='text-primary'>Create New Account</Link></small></p>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue with google</button>
                </div>
            </div>
        </div >
    );
};

export default Login;