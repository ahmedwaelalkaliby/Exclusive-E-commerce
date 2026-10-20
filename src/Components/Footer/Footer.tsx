import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useAppSelector } from '../../store/hooks';

const accountLinks = ['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'];
const quickLinks = ['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'];

export default function Footer() {
  const theme = useAppSelector((state) => state.theme);
  const dark = theme === 'light';
  const footerTheme = dark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900';

  return (
    <footer className={`${footerTheme} mt-12 py-12`}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <section>
          <h2 className="mb-5 text-2xl font-bold">Exclusive</h2>
          <h3 className="mb-2 font-semibold">Subscribe</h3>
          <p className="mb-4 text-sm opacity-80">Get 10% off your first order</p>
          <form className="flex max-w-xs items-center rounded border border-current px-3 py-2" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Enter your email" aria-label="Email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-60" />
            <button type="submit" aria-label="Subscribe"><RiSendPlaneFill size={20} /></button>
          </form>
        </section>
        <section>
          <h3 className="mb-4 font-bold">Support</h3>
          <address className="space-y-2 text-sm not-italic leading-6 opacity-80">111 Bijoy Sarani, Dhaka, Bangladesh.<br />exclusive@gmail.com<br />+88015-88888-9999</address>
        </section>
        <section>
          <h3 className="mb-4 font-bold">Account</h3>
          <ul className="space-y-2 text-sm opacity-80">{accountLinks.map((link) => <li key={link}><a href={`/${link}`} className="hover:underline">{link}</a></li>)}</ul>
        </section>
        <section>
          <h3 className="mb-4 font-bold">Quick Link</h3>
          <ul className="space-y-2 text-sm opacity-80">{quickLinks.map((link) => <li key={link}><a href={`/${link}`} className="hover:underline">{link}</a></li>)}</ul>
        </section>
        <section>
          <h3 className="mb-3 font-bold">Download App</h3>
          <p className="mb-3 text-sm opacity-80">Save $3 with App New User Only</p>
          <div className="flex items-center gap-3">
            <img src="/images/Qrcode1.png" alt="QR code" className="h-20 w-20 bg-white p-1" />
            <div className="flex flex-col gap-2">
              <a href="#playstore"><img src="/images/play-store.png" alt="Google Play" className="w-28" /></a>
              <a href="#appstore"><img src="/images/appstore.png" alt="App Store" className="w-28" /></a>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-xl">
            <a href="#facebook" aria-label="Facebook"><AiFillFacebook /></a>
            <a href="#twitter" aria-label="Twitter"><AiOutlineTwitter /></a>
            <a href="#instagram" aria-label="Instagram"><AiFillInstagram /></a>
            <a href="#linkedin" aria-label="LinkedIn"><AiFillLinkedin /></a>
          </div>
        </section>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-current/20 px-5 pt-5 text-center text-xs opacity-60 lg:px-8">© Copyright Rimel 2025. All rights reserved</p>
    </footer>
  );
}
