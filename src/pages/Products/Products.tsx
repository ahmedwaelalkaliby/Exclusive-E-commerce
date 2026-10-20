import { Row, Spinner, Button } from "react-bootstrap";
import ProductCard from '../../Components/Product/ProductCard';
import { useGetProductsQuery } from '../../store/api';

export default function Products() {

  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  if (isLoading) return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" variant="danger" />
    </div>
  );

  if (isError) return (
    <div className="text-center py-5">
      <p className="text-danger">Unable to load products.</p>
      <Button onClick={refetch}>Retry</Button>
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
