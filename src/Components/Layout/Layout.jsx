import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from "../Footer/Footer"
import Sidebar from "../Sidebar/Sidebar"
export default function Layout() {
    return<>
     
    <div className="d-flex flex-column vh-100 overflow-x-hidden">
    <Header/>
      <main className='container-fluid flex-grow-1 p-3'>
        <Outlet/>
      </main>
      <Footer />
    </div>
  </>
}


