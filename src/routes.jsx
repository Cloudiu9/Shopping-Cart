import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  // TODO need to add individual pages for each shop card elem here?
  {
    path: "shop",
    element: <ShopPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
