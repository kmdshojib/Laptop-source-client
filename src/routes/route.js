import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/404NotFound/NotFound";
import Blog from "../components/Blog/blog";
import DashBoard from "../components/Dashboard/Dashboard";
import Home from "../components/Home/Home";
import Login from "../components/login/login";
import Register from "../components/register/register";
import Main from "../layout/main";
import AdminRoute from "./adminroute";

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
                path: "/admindashboard",
                element: <AdminRoute><DashBoard /></AdminRoute>
            },
            {
                path:"*",
                element: <NotFound />
            }

        ]
    },

])