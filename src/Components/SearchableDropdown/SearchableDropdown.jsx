import React from 'react'
import { useState, useRef } from 'react';

const [searchText, setSearchText] = useState("");
const handleSearch = (e) => {
  setSearchText(e.target.value);
};

//Build a reusable SearchableSelect component.
//Requirements:
// 1-Display a dropdown containing a list of options.
// User can search by typing in the search field.
// 2-Show only options matching the search text.
// 3-User can select an option.
// Display the selected option in the trigger.
// 4-Close the dropdown after selection.
// 5-Support basic keyboard navigation:
// ArrowDown
// ArrowUp
// Enter
// Escape
// 6-Handle empty search results.

const list = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
export default function SearchableDropdown() {

  const ref = useRef(null); 
  const [isOpen, setIsOpen] = useState(false); 
  

    return (<>  
      <input type="text" placeholder="Search..." value={searchText} onChange={handleSearch} /> 
      {list.map((option, index) => (
        <div key={index}>{option}</div>
      ))}
      
      <div>SearchableDropdown</div>
    </>
  )
}
