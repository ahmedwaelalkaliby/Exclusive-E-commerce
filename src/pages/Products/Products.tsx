import ProductCard from '../../Components/Product/ProductCard';
import { useGetProductsQuery } from '../../store/api';

export default function Products() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  if (isLoading) return <div className="grid min-h-72 place-items-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" role="status" aria-label="Loading products" /></div>;
  if (isError) return <div className="py-16 text-center"><p className="mb-4 text-red-600">Unable to load products.</p><button type="button" onClick={refetch} className="rounded bg-slate-900 px-5 py-2 text-white hover:bg-red-600">Try again</button></div>;
  if (!products?.length) return <p className="py-16 text-center text-slate-500">No products found.</p>;

  return (
    <section className="py-4">
      <h1 className="mb-6 text-3xl font-bold text-slate-950">All Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
