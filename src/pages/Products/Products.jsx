import React from 'react';
import { Row, Spinner, Button } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import ProductCard from '../../Components/Product/ProductCard';


const fetchProducts = async () => {
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  return data.data;
};

export default function Products() {

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5000,
  });

  if (isLoading) return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" variant="danger" />
    </div>
  );

  if (isError) return (
    <div className="text-center py-5">
      <p className="text-danger">Error: {error.message}</p>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </div>
  );

  return (
    <div className="container py-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </div>
  );
}
