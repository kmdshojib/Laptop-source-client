import React, { useContext } from 'react';
import Spinner from '../Spinner/Spinner';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/authcontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["myproducts"],
        queryFn: () => fetch(`http://localhost:5000/myproducts/${user?.email}`).then(res => res?.json())
    })
    if (isLoading) return <Spinner />
    if (error) return <p>Something went wrong!</p>

    const handleAdvertisement = (id) => {
        const advertised = {
            "advertised": true
        }
        fetch(`http://localhost:5000/productCollections/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(advertised)
        })
            .then(res => res.json())
            .then(data => {
                data?.acknowledged && toast.success("Successfully advertised")
            })
    }
    const handleSoldItem = (id) => {
        console.log(id)

        axios.delete(`http://localhost:5000/products/${id}`)
            .then(res => {
                res.status === 200 && toast.success("Mark as sold successfully")
                refetch()
            })
    }
    return (
        <div className="ml-5 mt-5 grid grid-rows gap-5 md:grid-cols-2 lg:grid-cols-3">
            {
                data?.map(ele => (
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
                            </div>
                            <div className="card-actions justify-center">
                                <div>
                                    <p className="text-center cursor-pointer text-blue-700 underline" onClick={() => handleAdvertisement(ele._id)}>Advertise</p>
                                </div>
                                <div>
                                    <p className="text-center cursor-pointer text-blue-700 underline" onClick={() => handleSoldItem(ele._id)}>Mark As Sold</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default MyProducts;