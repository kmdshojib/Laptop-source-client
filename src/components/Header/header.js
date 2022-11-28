import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authcontext';
import useSeller from '../../Hooks/useSeller';
import useAdmin from './../../Hooks/useAdmin';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const handleLogOut = () => logOut()
    console.log(user)
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/">Home</Link></li>
                            {(user && (isSeller || isAdmin)) && <li><Link to="/addproduct">Add Product</Link></li>}
                            {(user && isSeller) && <li><Link to="/myproducts">My Products</Link></li>}
                            {(user && isAdmin) && <li><Link to="/admindashboard/allsellers">Dashboard</Link></li>}
                            {
                                (user && user?.uid) ?
                                    <li><p onClick={handleLogOut}>Log Out</p></li>
                                    :
                                    <>
                                        <li><Link to="/login">Sign In</Link></li>
                                        <li><Link to="/register">Register</Link></li>
                                    </>
                            }
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl">Laptop Source</Link>
                </div>

                <div className="navbar-end mr-5">
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li><Link to="/">Home</Link></li>
                            {(user && (isSeller || isAdmin)) && <li><Link to="/addproduct">Add Product</Link></li>}
                            {(user && isSeller) && <li><Link to="/myproducts">My Products</Link></li>}
                            {(user && isAdmin) && <li><Link to="/admindashboard/allsellers">Dashboard</Link></li>}
                            <li><Link to="/blog">Blog</Link></li>
                            {
                                (user && user?.uid) ?
                                    <>
                                        <li><Link to="/myorders">My Orders</Link></li>
                                        <li><p onClick={handleLogOut}>Log Out</p></li>
                                    </>
                                    :
                                    <>
                                        <li><Link to="/login">Sign In</Link></li>
                                        <li><Link to="/register">Register</Link></li>
                                    </>
                            }
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;