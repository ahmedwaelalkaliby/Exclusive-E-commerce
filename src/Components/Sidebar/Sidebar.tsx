import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useAppSelector } from '../../store/hooks';

const categories = ['Mens Fashion', 'Womens Fashion', 'Electronics', 'Home Furniture', 'Medicine', 'Sports Wear', 'Games', 'Baby & Toys', 'Health & Beauty'];
const slides = ['/images/Frame.png', '/images/Frame.png', '/images/Frame.png'];

export default function Sidebar() {
  const theme = useAppSelector((state) => state.theme);
  const [activeSlide, setActiveSlide] = useState(0);
  const dark = theme === 'dark';

  const changeSlide = (direction: number) => setActiveSlide((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className={`mb-10 grid gap-6 lg:grid-cols-[220px_1fr] ${dark ? 'text-white' : 'text-slate-900'}`}>
      <ul className="hidden flex-wrap gap-3 md:flex lg:flex-col lg:gap-4">
        {categories.map((category) => <li key={category} className="text-sm">{category}</li>)}
      </ul>
      <div className="relative overflow-hidden rounded-lg bg-slate-100">
        <img src={slides[activeSlide]} alt={`Promotion ${activeSlide + 1}`} className="h-auto w-full object-cover" />
        <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous promotion" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-900 shadow hover:bg-white"><AiOutlineLeft /></button>
        <button type="button" onClick={() => changeSlide(1)} aria-label="Next promotion" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-900 shadow hover:bg-white"><AiOutlineRight /></button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => <button key={`${slide}-${index}`} type="button" aria-label={`Show promotion ${index + 1}`} onClick={() => setActiveSlide(index)} className={`h-2.5 w-2.5 rounded-full ${activeSlide === index ? 'bg-red-600' : 'bg-white/80'}`} />)}
        </div>
      </div>
    </section>
  );
}
