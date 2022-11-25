import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const ProductCategories = () => {
    const navigate = useNavigate()
    const { isLoading, error, data } = useQuery({
        queryKey: ["category"],
        queryFn: () => fetch("http://localhost:5000/categories").then(res => res.json())
    })
    if (isLoading) return <Spinner />
    if (error) return <p>Something went wrong!</p>
    return (
        <div className="flex flex-col lg:flex-row justify-around mt-10">
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