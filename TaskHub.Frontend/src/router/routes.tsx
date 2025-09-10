import Home from "@/pages/Home";
import { RouteObject } from "react-router";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/about",
        element: <div>About Page</div>,
    },
    {
        path: "/contact",
        element: <div>Contact Page</div>,
    },
    {
        path: "*",
        element: <div>Not Found</div>,
    },
];
