import React from 'react';
import Banner from './homebanner.js'
import useTitle from './../../Hooks/useTitle';
import ProductCategories from './categories.js';
import AdvertisedLaptop from '../AdvertisedLaptop/advertisedLaptops.js';
import { useQuery } from 'react-query';
import Spinner from './../Spinner/Spinner';

const Home = () => {
    useTitle("Home")
    const { isLoading, error, data, } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetch("http://localhost:5000/products")
            .then(res => res.json())

    })
    if (isLoading) return <Spinner />
    if (error) return <p>Something went wrong!</p>
    const advertisedData = data.filter(advertised => advertised.advertised === true)
    return (
        <div>
            <Banner />
            <h2 className="text-center text-2xl font-bold mt-5">Laptop Categories</h2>
            <ProductCategories />
            {
                advertisedData.length > 0 && <div>
                <h2 className="text-center text-2xl font-bold mt-5">Advertised Laptop</h2>
                <AdvertisedLaptop />
            </div>
            }
        </div>
    );
}

export default Home;