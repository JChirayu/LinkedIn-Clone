import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../Layout/HomeLayout";
import ProfileLayout from "../Layout/ProfileLayout";
import ConnectionLayout from "../Layout/ConnectionLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/home',
        element: <HomeLayout />
    },
    {
        path: '/profile',
        element: <ProfileLayout />
    },
    {
        path: '/connection',
        element: <ConnectionLayout />
    }
]);