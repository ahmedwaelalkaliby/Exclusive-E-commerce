import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import { ThemeProvider } from './ThemeContext.jsx/ThemeContext';
import Login from './pages/SignUp/Login';
import Signup from './pages/SignUp/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from "react-bootstrap/Badge";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css"; 
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Cart from './pages/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from './pages/Wishlist';
import { AuthProvider } from './context/AuthContext';

let queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={routes}/>
          <ReactQueryDevtools/>
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
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
