import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/authcontext';
import useTitle from '../../Hooks/useTitle';
import { toast } from 'react-toastify';

import { FcGoogle } from "react-icons/fc"
import useToken from '../../Hooks/useToken';

const Login = () => {
    useTitle("Sign In")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext)
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    // react router dom 
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        const email = data.email
        const password = data.password
        signIn(email, password)
            .then(result => {
                (result?.user && result.user?.uid) && toast.success("User logged in successfully")
                console.log(result.user.email)
                setLoginUserEmail(email)
            })
            .catch(error => console.log(error))

    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = {
                    email: result.email,
                    name: result.displayName,
                    role: "buyer"
                }
                fetch("http://localhost:5000/users", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => setLoginUserEmail(result.email))
                .catch(err => console.error(err))
                navigate(from, { replace: true });
            })
    }

    return (
        <div className="flex justify-center mt-10 ">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit(handleLogin)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block ">Email</label>
                        <input type="email" {...register("email", { required: true })} name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        {errors.email && <p className="text-red-500 text-xs">Check your Email!</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block ">Password</label>
                        <input type="password" {...register("password", { required: true })} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md input input-bordered" />
                        {errors.password && <p className="text-red-500 text-xs">Check your Password!</p>}
                    </div>
                    <button className="block p-3 text-center rounded btn btn-primary w-full">Sign in</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 "></div>
                    <p className="px-3 text-sm ">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 "></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogleLogin} aria-label="Log in with Google" className="p-3 rounded-sm ">
                        <FcGoogle />
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 font-bold">Don't have an account?
                    <Link to="/register" rel="noopener noreferrer" className="underline text-blue-500" data-abc="true">  Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;