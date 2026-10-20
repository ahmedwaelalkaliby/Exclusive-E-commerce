import Sidebar from '../../Components/Sidebar/Sidebar';
import Products from '../Products/Products';
import { FaHeadset, FaShieldAlt, FaTruck } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="space-y-14 py-4">
      <Sidebar />
      <Products />
      <section className="grid grid-cols-1 gap-8 py-8 text-center sm:grid-cols-3">
        <div className="flex flex-col items-center gap-3"><FaTruck size={52} /><h2 className="font-bold">FREE AND FAST DELIVERY</h2><p className="text-sm text-slate-600">Free delivery for all orders over $140</p></div>
        <div className="flex flex-col items-center gap-3"><FaHeadset size={52} /><h2 className="font-bold">24/7 CUSTOMER SERVICE</h2><p className="text-sm text-slate-600">Friendly support whenever you need it</p></div>
        <div className="flex flex-col items-center gap-3"><FaShieldAlt size={52} /><h2 className="font-bold">MONEY BACK GUARANTEE</h2><p className="text-sm text-slate-600">We return your money within 30 days</p></div>
      </section>
    </div>
  );
}
