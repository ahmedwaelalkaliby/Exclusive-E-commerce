import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Products from '../Products/Products';

export default function Home() {
  return <>
  <div className='container-fluid'>
      <Sidebar/>
  </div>
  <Products/>
  </>
}
