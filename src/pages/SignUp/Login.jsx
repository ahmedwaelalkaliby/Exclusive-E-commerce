import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import './Login.css'; // Import the new CSS file

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(formvalues) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        formvalues
      );
      if (data.message === 'success') {
        setIsLoading(false);
        navigate('/');
      } else {
        setIsLoading(false);
        alert(data.message || 'An error occurred');
      }
    } catch (err) {
      setIsLoading(false);
      alert(err.response?.data?.message || 'An error occurred');
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: handleRegister,
  });

  return (
     <div className="row align-items-center justify-content-center gap-5"> 
      <div className="col-12 col-md-6 mb-4">
          <img
            src="/images/phone1.png"
            className="img-fluid login-image"
            alt="Signup"
          />
        </div>
      <div className="col-4 d-flex flex-column gap-3 col-3 login-form">
        <div>
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>
        </div>
        <form className="d-flex flex-column gap-4 col-9" onSubmit={formik.handleSubmit}>
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            type="email"
            label="Email"
            variant="standard"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            type="password"
            label="Password"
            variant="standard"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <button type="submit" className="btn btn-danger text-white">
            {isLoading ? <div className="spinner-border text-light" role="status"></div> : 'Sign In'}
          </button>
          <Link className="text-danger">Forget Password?</Link>
        </form>
      </div>
    </div>
  );
}