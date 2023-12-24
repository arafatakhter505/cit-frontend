import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Auth, Product, ProductDetails } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Product />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
]);

export default router;
