import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery = async ({ url, method = 'GET', body, params }) => {
  if (typeof url !== 'string' || !url.trim()) {
    return { error: { status: 'CUSTOM_ERROR', data: { message: 'API request is missing a URL.' } } };
  }

  try {
    const response = await axios({
      url: `https://ecommerce.routemisr.com/api/v1/${url}`,
      method,
      data: body,
      params,
    });
    return { data: response.data };
  } catch (error) {
    return {
      error: {
        status: error.response?.status ?? 'FETCH_ERROR',
        data: error.response?.data ?? { message: error.message },
      },
    };
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({ query: () => ({ url: 'products' }), transformResponse: (response) => response.data }),
    getProduct: builder.query({ query: (id) => ({ url: `products/${id}` }), transformResponse: (response) => response.data }),
    login: builder.mutation({ query: (credentials) => ({ url: 'auth/signin', method: 'POST', body: credentials }) }),
    signup: builder.mutation({ query: (details) => ({ url: 'auth/signup', method: 'POST', body: details }) }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery, useLoginMutation, useSignupMutation } = api;
