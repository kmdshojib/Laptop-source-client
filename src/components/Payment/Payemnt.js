import React from 'react';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js'
import { useLoaderData } from 'react-router-dom';
import useTitle from './../../Hooks/useTitle';
import CheckoutForm from './checkoutform';

const stripePromise = loadStripe(process.env.React_APP_STRIPE);
const Payment = () => {
    useTitle("Payment")
    const Productdata = useLoaderData()
    const { productPrice, productName } = Productdata
    return (
        <div>
            {
                <>
                    <h3 className="text-3xl ml-5">Payment for: {productName}</h3>
                    <p className="ml-5 mt-5 mb-5">Price:{productPrice}</p>
                </>
            }
            <div className='w-96'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        Productdata={Productdata}
                    />
                </Elements>
            </div>
        </div>
    );
}

export default Payment;