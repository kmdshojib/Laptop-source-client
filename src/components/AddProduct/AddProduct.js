import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/authcontext';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm()
    const [seller, setSeller] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/seller/${user?.email}`)
            .then(res => res.json())
            .then(data => setSeller(data))
            .catch(err => console.log(err))
    }, [user])
    const handleProductSubmit = (data) => {
        const productName = data.productname
        const img = data.productimage
        const category = data.category
        const price = data.price
        const description = data.description
        const condition = data.condition
        const year = data.year
        const loaction = data.loaction



        const product = {
            category: category,
            laptopName: productName,
            image: img,
            price: price,
            condition: condition,
            description: description,
            year: year,
            loaction: loaction,
            seller: seller?.name,
            verified: seller?.verified
        }
        axios({
            method: 'post',
            url: "http://localhost:5000/products",
            data: product
        })
        reset()
    }
    return (
        <div className="flex justify-center mt-10 mb-10">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">Add a Product</h1>
                <form onSubmit={handleSubmit(handleProductSubmit)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="role" className="block ">Select Laptop Catagory</label>
                        <select {...register("category")} className="select select-bordered w-full" name='category'>
                            <option defaultValue value="business">Business</option>
                            <option value="gaming">Gaming</option>
                            <option value="apple">Apple</option>
                        </select>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="role" className="block ">Select Laptop Condition</label>
                        <select {...register("condition")} className="select select-bordered w-full" name='condition'>
                            <option defaultValue value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="productname" className="block ">Laptop Name</label>
                        <input type="text" {...register("productname")} required name="productname" id="productname" placeholder="Laptop Name" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="price" className="block ">Laptop Price</label>
                        <input type="number" {...register("price")} required name="price" id="price" placeholder="Price" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="productname" className="block ">Laptop Image URL</label>
                        <input type="text" {...register("productimage")} required name="productimage" id="productimage" placeholder="Product Image" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="year" className="block ">Purchasing Year</label>
                        <input type="number" {...register("year")} required name="year" id="price" placeholder="Purchasing Year" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="description" className="block ">Laptop Description</label>
                        <input type="text" {...register("description")} required name="description" id="description" placeholder="Product description" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="loaction" className="block ">Loaction</label>
                        <input type="text" {...register("loaction")} required name="loaction" id="loaction" placeholder="Product loaction" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block ">Seller Name</label>
                        <input type="text" {...register("username")} defaultValue={user?.displayName} readonly="readonly" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md input input-bordered" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block ">Email</label>
                        <input type="email" {...register("email")} defaultValue={user?.email} readonly="readonly" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                    </div>
                    <button type="submit" className="block p-3 text-center rounded btn btn-primary w-full">Add Product</button>
                </form>

            </div>
        </div>
    );
}

export default AddProduct;