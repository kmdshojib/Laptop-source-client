import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './../../context/authcontext';
import useTitle from './../../Hooks/useTitle';
import useToken from './../../Hooks/useToken';

const Register = () => {
    useTitle("Register")
    const { register, handleSubmit, reset } = useForm()
    const { signUp, updateUserProfile } = useContext(AuthContext)
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    // react router dom 
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    const handleRegister = (data) => {
        const email = data.email
        const password = data.password
        const displayName = data.username
        const role = data.role

        const user = {
            email: email,
            name: displayName,
            role: role
        }

        if (token) {
            navigate('/');
        }
        // signup

        signUp(email, password)
            .then(data => {
                (data?.user && data?.user?.uid) &&
                    // sending user to database
                    fetch("https://laptop-source-server-kmdshojib.vercel.app/users", {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => setCreatedUserEmail(email))
                        .catch(err => console.error(err))

                handleUserProflile(displayName)
                navigate(from, { replace: true });
                toast.success("Registerd Success")
                reset()
            })

            .catch(err => console.error(err))

        // update a user
        const handleUserProflile = (name) => {
            const profile = { displayName: name }
            updateUserProfile(profile)
                .then(data => console.log(data))
                .catch(err => console.log(err))
        }
    }
    return (
        <div className="flex justify-center mt-10 mb-10">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                <form onSubmit={handleSubmit(handleRegister)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block ">Username</label>
                        <input type="text" {...register("username")} name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md input input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block ">Email</label>
                        <input type="email" {...register("email")} name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="role" className="block ">Select Account Type</label>
                        <select {...register("role")} className="select select-bordered w-full" name='role'>
                            <option defaultValue value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block ">Password</label>
                        <input type="password" {...register("password")} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <button type="submit" className="block p-3 text-center rounded btn btn-primary w-full">Sign Up</button>
                </form>

                <p className="text-xs text-center sm:px-6 mt-5 font-bold">Have an account?
                    <Link to="/login" rel="noopener noreferrer" className="underline text-blue-500" data-abc="true"> Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;