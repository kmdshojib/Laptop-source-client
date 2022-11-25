import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/authcontext';

const AddProduct = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    return ( 
        <div className="flex justify-center mt-10 mb-10">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-center">Add a Product</h1>
            <form onSubmit={handleSubmit()} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
            <div className="space-y-1 text-sm">
                    <label htmlFor="role" className="block ">Select Laptop Catagory</label>
                    <select {...register("role")} className="select select-bordered w-full" name='role'>
                        <option defaultValue value="business">Business</option>
                        <option value="gaming">Gaming</option>
                        <option value="apple">Apple</option>
                    </select>
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="productname" className="block ">Product Name</label>
                    <input type="text" {...register("productname")} required name="productname" id="productname" placeholder="Product Name" className="w-full px-4 py-3 rounded-md input  input-bordered" />
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="productname" className="block ">Product Image URL</label>
                    <input type="text" {...register("productimage")} required name="productimage" id="productimage" placeholder="Product Image" className="w-full px-4 py-3 rounded-md input  input-bordered" />
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