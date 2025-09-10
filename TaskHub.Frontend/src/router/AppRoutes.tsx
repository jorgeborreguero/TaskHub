import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { routes } from "./routes";

export default function AppRoutes() {
    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />;
}
