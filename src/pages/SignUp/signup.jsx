import React from 'react';
import Signin from './Login';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'; 
import { useState } from 'react';
import './signup.css'; // Add a CSS file for custom styles

export default function Signup() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(formvalues) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
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
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Repeat Password is required'),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone number must be egyptian Number').required('Phone number is required'),
    }),
    onSubmit: handleRegister,
  });

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-6 mb-4">
          <img
            src="/images/phone1.png"
            className="img-fluid signup-image"
            alt="Signup"
          />
        </div>
        <div className="col-12 col-md-6">
          <h1>Create an account</h1>
          <p>Enter your details below</p>
          <form className="d-flex flex-column gap-4" onSubmit={formik.handleSubmit}>
            <TextField
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              type="text"
              label="Name"
              variant="standard"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
            <TextField
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="rePassword"
              type="password"
              label="Repeat Password"
              variant="standard"
              error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
              helperText={formik.touched.rePassword && formik.errors.rePassword}
            />
            <TextField
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              type="phone"
              label="Phone"
              variant="standard"
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <button type="submit" className="btn btn-danger text-white">
              {isLoading ? <div className="spinner-border text-light" role="status"></div> : 'Create Account'}
            </button>
            <button className="btn btn-light">
              <div className="d-flex gap-3 justify-content-center align-items-center">
                <img src="../images/Google.png" alt="Google" width="20" height="20" />
                <p className="mb-0">Sign up with Google</p>
              </div>
            </button>
            <div className="d-flex gap-3 justify-content-center align-items-center">
              <p className="mb-0">Already have an account!</p>
              <button
                onClick={() => navigate('/Login')}
                className="btn btn-light border-0 border-bottom text-black"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}