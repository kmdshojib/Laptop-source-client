import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const ProductCategories = () => {
    const navigate = useNavigate()
    const { isLoading, error, data } = useQuery({
        queryKey: ["category"],
        queryFn: () => fetch("https://laptop-source-server-kmdshojib.vercel.app/categories").then(res => res.json())
    })
    if (isLoading) return <Spinner />
    if (error) return <p>Something went wrong!</p>
    return (
        <div className="grid grid-rows md:grid-cols-2 lg:grid-cols-3 mt-10">
            {
                data.map(item => {
                    const category = item.catagoryName.toLowerCase();
                    return (
                        <div key={item._id} className="card w-96 bg-base-100 shadow-xl mt-5 ml-10">
                            <figure><img src={item.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.catagoryName}</h2>
                                <p>{item.description}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => navigate(`/laptop/${category}`)} className="btn btn-primary">Go to category</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ProductCategories;