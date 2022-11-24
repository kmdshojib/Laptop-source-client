import { createBrowserRouter } from "react-router-dom";
import DashBoard from "../components/Dashboard/Dashboard";
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
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/admindashboard",
                element: <AdminRoute><DashBoard /></AdminRoute>
            }
        ]
    },

])