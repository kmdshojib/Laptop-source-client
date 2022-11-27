import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-10">
            <div className="grid grid-flow-col gap-4">
                <Link to="/" className="link link-hover">About us</Link>
                <Link to="/" className="link link-hover">Contact</Link>
                <Link to="/" className="link link-hover">Jobs</Link>
                <Link to="/" className="link link-hover">Press kit</Link>
            </div>
           
            <div>
                <p>Copyright © 2022 - All right reserved by Laptop Souce</p>
            </div>
        </footer>
    );
}

export default Footer;