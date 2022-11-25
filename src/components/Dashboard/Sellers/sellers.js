import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Spinner/Spinner';
import useTitle from './../../../Hooks/useTitle';

const AllSellers = () => {
    useTitle("Dashboard | All Sellers");
    const { isLoading, error, data } = useQuery({
        queryKey: ["sellers"],
        queryFn: () => fetch("http://localhost:5000/users/sellers")
            .then(res => res.json())

    })
    if (isLoading) return <Spinner />
    if (error) return <p>Something went wrong!</p>

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
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    <td>Verify</td>
                                    <td>Delete</td>
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