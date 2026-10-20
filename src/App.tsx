import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/SignUp/Login';
import Signup from './pages/SignUp/signup';
import Products from './pages/Products/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-rater/lib/react-rater.css"; 
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from './pages/Wishlist/Wishlist';
import SearchableDropdown from './Components/SearchableDropdown/SearchableDropdown';

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
      <SearchableDropdown />
      <RouterProvider router={routes} />
      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
      />
    </>
  )
}

export default App
