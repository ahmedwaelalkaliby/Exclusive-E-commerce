import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from "../Footer/Footer"
export default function Layout() {
    return<>
     
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
    <Header/>
      <main className='mx-auto w-full max-w-7xl flex-1 px-4 py-6 lg:px-8'>
        <Outlet/>
      </main>
      <Footer />
    </div>
  </>
}


