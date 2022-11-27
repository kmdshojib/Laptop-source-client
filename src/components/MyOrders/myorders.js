import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/authcontext';
import Spinner from './../Spinner/Spinner';



const MyOrders = () => {
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
                                <tr>
                                    <td>{item.productName}</td>
                                    <td>{item.productPrice}</td>
                                    <td className="cursor-pointer text-blue-700 hover:underline">Pay</td>
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