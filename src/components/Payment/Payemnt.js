import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from './../../Hooks/useTitle';


const Payment = () => {
    useTitle("Payment")
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            {
                <h3 className="text-3xl ml-5">Payment for {data?.productName}</h3>
            }
        </div>
    );
}

export default Payment;