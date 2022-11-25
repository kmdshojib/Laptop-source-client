import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Spinner/Spinner';
import useTitle from './../../../Hooks/useTitle';

import {GoVerified} from "react-icons/go"
import { toast } from 'react-toastify';

const AllSellers = () => {
    useTitle("Dashboard | All Sellers");
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: () => fetch("http://localhost:5000/users/sellers")
            .then(res => res.json())

    })
    if (isLoading) return <Spinner />
    if (error) return <p>Something went wrong!</p>

    const handleDelete = (id) =>{
        console.log(id)
        const confirm = window.confirm("Are you sure you want to delete")
        if(confirm){
            fetch(`http://localhost:5000/user/${id}`,{
            method: "DELETE",
        })
           .then(res => res.json())
           .then(data => {
                data.acknowledged && toast.warning("User deleted successfully!")
                refetch()
           })
        }
    }

    const handleVerify = (id) =>{
        const confirm = window.confirm("Are you sure you want to verify this seller!")
        const verify = {
            "verified": true,
        }
        if(confirm){
            fetch(`http://localhost:5000/user/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(verify)
            })
            .then(res => res.json())
            .then(data => {
                data?.acknowledged && toast.success("Seller Verified successfully")
                refetch()
            })
        }
    }

    return (
        <div className="w-full m-10">
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify Seller</th>
                            <th>Remove Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(buyer => (
                                <tr key={buyer._id}>
                                    <td className="flex">{buyer.name} <span className="mt-1 ml-1">{ buyer?.verified && <GoVerified />}</span> </td>
                                    <td>{buyer.email}</td>
                                    <td className="cursor-pointer text-blue-700 hover:underline" onClick={() => handleVerify(buyer._id)}>Verify</td>
                                    <td className="cursor-pointer text-blue-700 hover:underline" onClick={() => handleDelete(buyer._id)}>Delete</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllSellers;