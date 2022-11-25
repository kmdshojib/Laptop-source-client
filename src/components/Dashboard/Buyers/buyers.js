import React from 'react';
import { useQuery } from 'react-query';
import useTitle from '../../../Hooks/useTitle';
import Spinner from '../../Spinner/Spinner';

const AllBuyers = () => {
    useTitle("Dashboard | All Buyers");
    const { isLoading, error, data } = useQuery({
        queryKey: ["buyers"],
        queryFn: () => fetch("http://localhost:5000/users/buyers")
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
                            <th>Remove user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(buyer => (
                                <tr key={buyer._id}>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
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

export default AllBuyers;