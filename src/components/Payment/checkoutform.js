import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const CheckoutForm = ({ Productdata }) => {
    const stripe = useStripe()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [trxId, setTrxId] = useState("")
    const elements = useElements()
    const { productPrice, buyerEmail, buyerName, _id,bookedId } = Productdata

    const [clientSecret, setClientSecret] = useState("");
    
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://laptop-source-server-kmdshojib.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data?.clientSecret));
    }, [productPrice]);

 

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError("")
        }
        setSuccess("")
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    },
                },
            },
        );

        if (confirmError) {
            setError(confirmError.message)
            return
        }
        if (paymentIntent.status === "succeeded") {
            fetch(`https://laptop-source-server-kmdshojib.vercel.app/products/${bookedId}`,{
                method:"delete",
                headers:{
                    "content-type": "application/json"
                }
            }).then(res => res.json()).then(data => data && toast.success("you have done it!"))
            const payment = {
                productPrice,
                trxId: paymentIntent.id,
                productId: _id
            }
            fetch("https://laptop-source-server-kmdshojib.vercel.app/payments", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payment)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged) {
                        
                        setSuccess("Your transaction is successfull: ")
                        setTrxId(`${paymentIntent.id})`)
                    }
                });
        }
    }


    return (
        <div className="m-12">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button  type="submit" disabled={!stripe || !clientSecret} className="btn btn-primary mt-5">
                    Pay
                </button>
                
            </form>
            <p className="text-red-500">{error}</p>
            {
                success && <div>
                    <p className="text-green-500">{success}</p>
                    <p>Trasnaction id:<span>{trxId}</span></p>
                </div>
            }
        </div>
    );
}

export default CheckoutForm;