import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/login";
import Register from "../components/register/register";
import Main from "../layout/main";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Main />,
        children:[
            {
                path:"/login",
                element: <Login />
            },
            {
                path:"/register",
                element: <Register />
            }
        ]
    }
])