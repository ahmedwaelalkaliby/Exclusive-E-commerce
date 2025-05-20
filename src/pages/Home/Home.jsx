import React from 'react'
import Product from '../../Components/Product/Product';
import Sidebar from '../../Components/Sidebar/Sidebar';

export default function Home() {
  return <>
  <div className='container-fluid'>
      <Sidebar/>
  </div>
  <Product/>
  </>
}
