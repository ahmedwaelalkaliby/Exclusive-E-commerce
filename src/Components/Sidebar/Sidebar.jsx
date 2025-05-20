import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext.jsx/ThemeContext';


export default function Sidebar() {
  const{theme}= useContext(ThemeContext)
  return <div className= {`${theme == "dark" ? " bg-black text-white" : "bg-white text-black"} d-flex ms-2 col-12 mb-5 w-100 `}>
    <div className={`d-flex flex-column gap-3 col-3 mt-3`}>
      <h6>Mens Fashon</h6>
      <h6>Womwens Fashon</h6>
      <h6>Electronics</h6>
      <h6>Home ferniture</h6>
      <h6>Medicine</h6>
      <h6>Sports wear</h6>
      <h6>Games</h6>
      <h6>Baby & Toys</h6>
      <h6>Health & Buetty</h6>
    </div>
    <div className='col-9'>
      <img src="../images/Frame.png" width={"100%"}></img>
    </div>
  
  </div>
    
}
