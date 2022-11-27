import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/authcontext';
import useTitle from '../../Hooks/useTitle';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    useTitle("Add Product");
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm()
    const [seller, setSeller] = useState(null)
    const navigate = useNavigate()
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
        const oroginalPrice = data.price
        const resalePrice = data.resaleprice
        const description = data.description
        const condition = data.condition
        const year = data.year
        const loaction = data.loaction



        const product = {
            category: category,
            laptopName: productName,
            image: img,
            oroginalPrice: oroginalPrice,
            resalePrice: resalePrice,
            condition: condition,
            description: description,
            year: year,
            loaction: loaction,
            seller: seller?.name,
            verified: seller?.verified,
            email: seller?.email
        }
        axios({
            method: 'post',
            url: "http://localhost:5000/products",
            data: product
        })
        toast.success("Laptop added successfully")
        reset()
        navigate('/myproducts')
    }
    return (
        <div className="flex justify-center mt-10 mb-10">
            <div className="w-full max-w-md lg:max-w-5xl p-8 space-y-3 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">Add a Product</h1>
                <form onSubmit={handleSubmit(handleProductSubmit)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid ">
                    <div className="lg:grid grid-cols-2 mt-0">
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="role" className="block ">Select Laptop Catagory</label>
                            <select {...register("category")} className="select select-bordered w-full" name='category'>
                                <option defaultValue value="business">Business</option>
                                <option value="gaming">Gaming</option>
                                <option value="apple">Apple</option>
                            </select>
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="role" className="block ">Select Laptop Condition</label>
                            <select {...register("condition")} className="select select-bordered w-full" name='condition'>
                                <option defaultValue value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="productname" className="block ">Laptop Name</label>
                            <input type="text" {...register("productname")} required name="productname" id="productname" placeholder="Laptop Name" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="price" className="block ">Laptop Original Price</label>
                            <input type="number" {...register("price")} required name="price" id="price" placeholder="Original Price" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="resaleprice" className="block ">Laptop Resale Price</label>
                            <input type="number" {...register("resaleprice")} required name="resaleprice" id="resaleprice" placeholder="Resale Price" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="productname" className="block ">Laptop Image URL</label>
                            <input type="url" {...register("productimage")} required name="productimage" id="productimage" placeholder="Product Image" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="year" className="block ">Purchasing Year</label>
                            <input type="date" {...register("year")} required name="year" id="year" placeholder="Purchasing Year" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="description" className="block ">Laptop Description</label>
                            <input type="text" {...register("description")} required name="description" id="description" placeholder="Product description" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="loaction" className="block ">Loaction</label>
                            <input type="text" {...register("loaction")} required name="loaction" id="loaction" placeholder="Product loaction" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="username" className="block ">Seller Name</label>
                            <input type="text" {...register("username")} defaultValue={user?.displayName} readOnly="readOnly" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md input input-bordered" />
                        </div>
                        <div className="space-y-1 text-sm lg:max-w-md">
                            <label htmlFor="email" className="block ">Email</label>
                            <input type="email" {...register("email")} defaultValue={user?.email} readOnly="readOnly" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="block p-3 text-center rounded btn btn-primary lg:max-w-lg ">Add Product</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default AddProduct;