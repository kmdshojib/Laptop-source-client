import React from 'react';
import Banner from './homebanner.js'
import useTitle from './../../Hooks/useTitle';
import ProductCategories from './categories.js';

const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner />
            <ProductCategories />
        </div>
    );
}

export default Home;