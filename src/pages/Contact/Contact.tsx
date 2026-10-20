import { AiOutlineMail } from 'react-icons/ai';
import { FaPhoneAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 py-8 lg:grid-cols-[0.8fr_1.5fr]">
      <aside className="space-y-8 rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3"><FaPhoneAlt className="text-xl text-red-600" /><h2 className="text-lg font-semibold">Call To Us</h2></div>
          <p className="text-sm leading-6 text-slate-600">We are available 24/7, 7 days a week.<br />Phone: +8801611112222</p>
        </div>
        <hr className="border-slate-200" />
        <div className="space-y-3">
          <div className="flex items-center gap-3"><AiOutlineMail className="text-2xl text-red-600" /><h2 className="text-lg font-semibold">Write To Us</h2></div>
          <p className="text-sm leading-6 text-slate-600">Fill out our form and we will contact you within 24 hours.<br />customer@exclusive.com<br />support@exclusive.com</p>
        </div>
      </aside>
      <form className="space-y-5 rounded-xl border border-slate-200 p-6 shadow-sm" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-4 md:grid-cols-3">
          <input type="text" placeholder="Your Name *" aria-label="Your name" className="rounded bg-slate-100 px-4 py-3 outline-none ring-red-500 focus:ring-2" />
          <input type="email" placeholder="Your Email *" aria-label="Your email" className="rounded bg-slate-100 px-4 py-3 outline-none ring-red-500 focus:ring-2" />
          <input type="tel" placeholder="Your Phone *" aria-label="Your phone" className="rounded bg-slate-100 px-4 py-3 outline-none ring-red-500 focus:ring-2" />
        </div>
        <textarea placeholder="Your Message *" aria-label="Your message" rows={7} className="w-full resize-y rounded bg-slate-100 px-4 py-3 outline-none ring-red-500 focus:ring-2" />
        <div className="text-right"><button type="submit" className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700">Send Message</button></div>
      </form>
    </section>
  );
}
