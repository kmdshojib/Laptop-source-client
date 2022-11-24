import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {register,handleSubmit} = useForm();
    const handleLogin = (data) =>{
        console.log(data);
    }

    return (
        <div className="flex justify-center mt-10 ">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit(handleLogin)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block ">Email</label>
                        <input type="email" {...register("email")} name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block ">Password</label>
                        <input type="password" {...register("password")} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md input input-bordered" />
                     
                    </div>
                    <button className="block p-3 text-center rounded btn btn-primary w-full">Sign in</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 "></div>
                    <p className="px-3 text-sm ">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 "></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button aria-label="Log in with Google" className="p-3 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 ">Don't have an account?
                    <Link to="/register" rel="noopener noreferrer"  className="underline " data-abc="true">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;