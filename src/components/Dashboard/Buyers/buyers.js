import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import useTitle from '../../../Hooks/useTitle';
import Spinner from '../../Spinner/Spinner';

const AllBuyers = () => {
    useTitle("Dashboard | All Buyers");
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["buyers"],
        queryFn: () => fetch("https://laptop-source-server-kmdshojib.vercel.app/users/buyers")
            .then(res => res.json())

    })
    if (isLoading) return <Spinner />
    if (error) return <p>Something went wrong!</p>

    const handleDelete = (email) => {
        console.log(email)
        const confirm = window.confirm("Are you sure you want to delete")
        if (confirm) {
            fetch(`https://laptop-source-server-kmdshojib.vercel.app/user/${email}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    data.acknowledged && toast.warning("User deleted successfully!")
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
                            <th>Remove user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(buyer => (
                                <tr key={buyer._id}>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    <td className="cursor-pointer text-blue-700 hover:underline" onClick={() => handleDelete(buyer.email)}>Delete</td>
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