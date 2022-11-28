import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authcontext';
import useTitle from '../../Hooks/useTitle';
import Spinner from './../Spinner/Spinner';



const MyOrders = () => {
    useTitle("My Orders");
    const { user } = useContext(AuthContext)
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => fetch(`http://localhost:5000/myorders/${user?.email}`)
            .then(res => res.json())

    })
    useEffect(() => {
        refetch()
    }, [refetch])
    if (isLoading) return <Spinner />
    if (error) return <p>Something went wrong!</p>
    console.log(data)


    return (
        <div className='ml-20 mt-10 mb-10 max-w-screen-xl'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>

                            <th>Laptop Name</th>
                            <th>Price</th>
                            <th>Pay</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item => (
                                <tr key={item._id} className="hover">
                                    <td>{item.productName}</td>
                                    <td>{item.productPrice}</td>
                                    <td>{item?.paid ? <p className="text-inherit">Paid</p> : <Link className="cursor-pointer text-blue-700 hover:underline" to={`/payment/${item._id}`}>Pay</Link>}</td>
                                    <td className="cursor-pointer text-red-700 hover:underline">Delete</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div></div>
    );
}

export default MyOrders;