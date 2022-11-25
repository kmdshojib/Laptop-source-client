import React from 'react';
import { GoVerified } from 'react-icons/go';
import { useLoaderData } from 'react-router-dom';

const ProductPage = () => {
    const data = useLoaderData()
    console.log(data);
    return (
        <div className="mt-5">
            {
                data?.map(ele => (
                    <div key={ele._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={ele.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{ele.laptopName}</h2>
                            <p>{ele.description}</p>
                            <p>Price: ${ele.price}</p>
                            <p>Condition: {ele.contition}</p>
                            <p>Loaction: {ele.loaction}</p>
                            <p>Purchase Year: {ele.year}</p>
                            <p className="flex">Seller: {ele.seller} <span className="mt-1 ml-1">{ ele?.verified && <GoVerified />}</span></p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ProductPage;