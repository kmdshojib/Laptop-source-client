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
import PrivateRoute from "./privateRoute";
import Payment from "../components/Payment/Payemnt";
import ReportedIssue from "../components/Dashboard/ReportedItem/ReportedIssue";

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
                path: "/blog",
                element: <Blog />

            },
            {
                path: "/laptop/:category",
                element: <ProductPage />,
                loader: async ({ params }) => fetch(`http://localhost:5000/product/${params.category}`)
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
                path: "/myorders",
                element: <PrivateRoute><MyOrders /></PrivateRoute>
            },
            {
                path: "/payment/:id",
                element: <PrivateRoute><Payment /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/payment/${params.id}`)
            },
            {
                path: "/admindashboard/allsellers",
                element: <AdminRoute><DashBoard /></AdminRoute>,
                children: [
                    {
                        path: "/admindashboard/allbuyers",
                        element: <AllBuyers />
                    },

                    {
                        path: "/admindashboard/allsellers",
                        element: <AllSellers />
                    },
                    {
                        path: "/admindashboard/reoprtedissues",
                        element: <ReportedIssue />,
                        loader: async () => fetch("http://localhost:5000/reports")
                    }

                ]
            },
            {
                path: "*",
                element: <NotFound />
            }

        ]
    },

])