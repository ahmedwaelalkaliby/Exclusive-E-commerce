import { FaChartLine, FaHeadset, FaInstagram, FaLinkedinIn, FaMoneyBillWave, FaShieldAlt, FaShoppingBag, FaStore, FaTruck, FaTwitter } from 'react-icons/fa';

const stats = [
  { icon: <FaStore />, count: '10.5k', text: 'Sellers active on our site' },
  { icon: <FaMoneyBillWave />, count: '33k', text: 'Monthly product sales' },
  { icon: <FaShoppingBag />, count: '45.5k', text: 'Customers active on our site' },
  { icon: <FaChartLine />, count: '25k', text: 'Annual gross sales' },
];
const team = [
  { image: '/images/tom.png', name: 'Tom Cruise', role: 'Founder & Chairman' },
  { image: '/images/emma.png', name: 'Emma Watson', role: 'Managing Director' },
  { image: '/images/will.png', name: 'Will Smith', role: 'Product Designer' },
];

export default function About() {
  return (
    <div className="space-y-16 py-8">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-slate-950">Our Story</h1>
          <p className="leading-7 text-slate-700">Launched in 2015, Exclusive is South Asia's premier online shopping marketplace. Supported by tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.</p>
          <p className="leading-7 text-slate-700">Exclusive has more than 1 million products to offer and continues to grow, with a diverse assortment across categories.</p>
        </div>
        <img className="w-full rounded-2xl object-cover" src="/images/portrait-two-african-femal.png" alt="Customers shopping together" />
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <article key={stat.text} className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 p-7 text-center transition hover:border-red-500 hover:bg-red-600 hover:text-white">
          <span className="text-3xl" aria-hidden="true">{stat.icon}</span><strong className="text-3xl">{stat.count}</strong><p className="text-sm">{stat.text}</p>
        </article>)}
      </section>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((person) => <article key={person.name} className="overflow-hidden rounded-xl bg-slate-50">
          <img src={person.image} alt={person.name} className="h-96 w-full object-cover object-top" />
          <div className="p-5"><h2 className="text-2xl font-semibold">{person.name}</h2><p className="mt-1 text-slate-600">{person.role}</p>
            <div className="mt-4 flex gap-4 text-xl"><a href="#twitter" aria-label={`${person.name} on Twitter`}><FaTwitter /></a><a href="#instagram" aria-label={`${person.name} on Instagram`}><FaInstagram /></a><a href="#linkedin" aria-label={`${person.name} on LinkedIn`}><FaLinkedinIn /></a></div>
          </div>
        </article>)}
      </section>

      <section className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
        <div className="flex flex-col items-center gap-3"><FaTruck size={52} /><h2 className="font-bold">FREE AND FAST DELIVERY</h2><p className="text-sm text-slate-600">Free delivery for all orders over $140</p></div>
        <div className="flex flex-col items-center gap-3"><FaHeadset size={52} /><h2 className="font-bold">24/7 CUSTOMER SERVICE</h2><p className="text-sm text-slate-600">Friendly support whenever you need it</p></div>
        <div className="flex flex-col items-center gap-3"><FaShieldAlt size={52} /><h2 className="font-bold">MONEY BACK GUARANTEE</h2><p className="text-sm text-slate-600">We return your money within 30 days</p></div>
      </section>
    </div>
  );
}
