import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GoVerified } from 'react-icons/go';

import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './../../context/authcontext';




const ProductPage = () => {
    const { user } = useContext(AuthContext)
    const [bookingData, setBookingData] = useState(null)
    const producData = useLoaderData()

    const handleBooking = (e) => {
        e.preventDefault()
        const form = e.target
        const productName = form.productname.value
        const productPrice = form.price.value
        const buyerName = form.username.value
        const buyerEmail = form.email.value
        const loaction = form.loaction.value
        const phone = form.phone.value
        const originalPrice = form.original.value

        const order = {
            productName: productName,
            productPrice: productPrice,
            originalPrice:originalPrice,
            buyerName: buyerName,
            buyerEmail: buyerEmail,
            loaction: loaction,
            phone: phone
        }

        fetch("http://localhost:5000/orders",{
            method:"post",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => data.acknowledged && toast.success("Laptop booked Successfully"))
        .catch(err => console.error(err))
    }



    const handleBookingData = (id,event) => {
        axios.get(`http://localhost:5000/products/${id}`, {
            responseType: "json",
        })
            .then(res => setBookingData(res.data))
        event.target.htmlFor = "my-modal"
        if(!user){
            toast.warning("You must login to buy this item")
        }
    }
    const handleForm = (e) => {
        e.target.htmlFor ="my-modal"
    }
    return (
        <div className="ml-5 mt-5 grid grid-rows gap-5 md:grid-cols-2 lg:grid-cols-3">
            {
                producData?.map(ele => (
                    <div key={ele._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={ele.image} style={{ width: "384px", height: "282px", objectFit: "cover" }} alt="Shoes" /></figure>
                        <div className="card-body mt-5">
                            <h2 className="card-title ">{ele.laptopName}</h2>
                            <div className='mb-5 mt-5'>
                                <p>Original price: ${ele.oroginalPrice}</p>
                                <p>Resale Price: ${ele.resalePrice}</p>
                                <p>Condition: {ele.condition}</p>
                                <p>Loaction: {ele.loaction}</p>
                                <p>Description:{ele.description}</p>
                                <p>Purchase Year: {ele.year}</p>
                                <p className="flex">Seller: {ele.seller} <span className="mt-1 ml-1">{ele?.verified && <GoVerified />}</span></p>
                            </div>
                            <div className="card-actions justify-center">
                                {
                                    (user?.email === ele.email) ? <p className="text-center cursor-pointer text-blue-700 underline">Advertise</p> : <label onClick={(event) => handleBookingData(ele?._id,event)}  className="btn btn-primary" >Buy Now</label>
                                }
                            </div>
                        </div>
                    </div>


                ))
            }
            {
                (user && user?.uid) &&
                    <>
                        <input type="checkbox" id="my-modal" className="modal-toggle" />
                        <label className="modal cursor-pointe">
                            <div className="modal-box">
                                <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <div>
                                    <form onSubmit={handleBooking}>
                                        <div className="space-y-1 text-sm">
                                            <label htmlFor="productname" className="block ">Laptop Name</label>
                                            <input type="text" name="productname" defaultValue={bookingData?.laptopName} readOnly="readOnly" id="productname" className="w-full px-4 py-3 rounded-md input input-bordered" />
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <label htmlFor="price" className="block ">Resale Price: $</label>
                                            <input type="text" name="price" defaultValue={bookingData?.resalePrice} readOnly="readOnly" id="price" className="w-full px-4 py-3 rounded-md input input-bordered" />
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <label htmlFor="original" className="block ">Original Price: $</label>
                                            <input type="text" name="original" defaultValue={bookingData?.oroginalPrice} readOnly="readOnly" id="original" className="w-full px-4 py-3 rounded-md input input-bordered" />
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <label htmlFor="productname" className="block">Buyer Name</label>
                                            <input type="text" name="username" defaultValue={user?.displayName} readOnly="readOnly" id="username" className="w-full px-4 py-3 rounded-md input input-bordered" />
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <label htmlFor="email" className="block">Email</label>
                                            <input type="text" name="email" defaultValue={user?.email} readOnly="readOnly" id="email" className="w-full px-4 py-3 rounded-md input input-bordered" />
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <label htmlFor="loaction" className="block">Loaction</label>
                                            <input type="text" name="loaction" id="loaction" placeholder="Loaction" className="w-full px-4 py-3 rounded-md input input-bordered" required />
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <label htmlFor="phone" className="block">Phone</label>
                                            <input type="tel" name="phone" id="phone" placeholder="Phone number" className="w-full px-4 py-3 rounded-md input input-bordered" required />
                                        </div>
                                        <div className="flex justify-center mt-5">
                                            <input onClick={() => handleForm} htmlFor="" type="submit" className="btn btn-primary" value="Submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </label>
                    </>     
            }
        </div>
    );
}

export default ProductPage;