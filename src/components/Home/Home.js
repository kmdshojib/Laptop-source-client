import React from 'react';
import Banner from './homebanner.js'
import useTitle from './../../Hooks/useTitle';
import ProductCategories from './categories.js';

const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner />
            <h2 className="text-center text-2xl font-bold mt-5">Laptop Categories</h2>
            <ProductCategories />
            <h2 className="text-center text-2xl font-bold mt-5">Advertised Laptop</h2>
        </div>
    );
}

export default Home;