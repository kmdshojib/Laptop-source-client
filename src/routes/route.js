import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/404NotFound/NotFound";
import AddProduct from "../components/AddProduct/AddProduct";
import Blog from "../components/Blog/blog";
import AllBuyers from "../components/Dashboard/Buyers/buyers";
import DashBoard from "../components/Dashboard/Dashboard";
import AllSellers from "../components/Dashboard/Sellers/sellers";
import Home from "../components/Home/Home";
import Login from "../components/login/login";
import Register from "../components/register/register";
import Main from "../layout/main";
import AdminRoute from "./adminroute";
import ProductPage from './../components/productpage/ProductPage';
import MyProducts from "../components/MyProducts/myproducts";
import MyOrders from "../components/MyOrders/myorders";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path:"/blog",
                element: <Blog />

            },
            {
                path:"/laptop/:category",
                element: <ProductPage />,
                loader: async ({params}) => fetch(`http://localhost:5000/product/${params.category}`)
            },
            {
                path: "/addproduct",
                element: <AddProduct />
            },
            {
                path: "/myproducts",
                element: <MyProducts />
            },
            {
                path:"/myorders",
                element: <MyOrders />
            },
            {
                path: "/admindashboard",
                element: <AdminRoute><DashBoard /></AdminRoute>,
                children:[
                    {
                        path:"/admindashboard/allbuyers",
                        element: <AllBuyers />
                    },
                    
                    {
                        path:"/admindashboard/allsellers",
                        element: <AllSellers />
                    },

                ]
            },
            {
                path:"*",
                element: <NotFound />
            }

        ]
    },

])