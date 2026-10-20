import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/SignUp/Login';
import Signup from './pages/SignUp/signup';
import Products from './pages/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import ToastViewport from './Components/ToastViewport';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "Login",
          element: <Login/>,
        },
        {
          path: "productdetails/:id/:category",
          element: <ProductDetails />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastViewport />
    </>
  )
}

export default App
