import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/footer';
import Header from '../components/Header/header';


const Main = () => {
    return ( 
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
     );
}
 
export default Main;