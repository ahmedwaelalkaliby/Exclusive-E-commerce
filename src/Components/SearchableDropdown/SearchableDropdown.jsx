import React, { useRef, useState } from 'react';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

export default function SearchableDropdown() {
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchText.toLowerCase()));

  const selectOption = (option) => {
    setSelectedOption(option);
    setSearchText('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') return setIsOpen(false);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === 'Enter' && isOpen && filteredOptions[activeIndex]) {
      event.preventDefault();
      selectOption(filteredOptions[activeIndex]);
    }
  };

  return (
    <div className="position-relative" style={{ maxWidth: 320 }}>
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder={selectedOption || 'Search options...'}
        value={searchText}
        onChange={(event) => { setSearchText(event.target.value); setActiveIndex(0); setIsOpen(true); }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-autocomplete="list"
      />
      {isOpen && (
        <ul className="list-group position-absolute w-100" role="listbox" style={{ zIndex: 1050 }}>
          {filteredOptions.length ? filteredOptions.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={index === activeIndex}
              className={`list-group-item list-group-item-action${index === activeIndex ? ' active' : ''}`}
              onMouseDown={() => selectOption(option)}
            >{option}</li>
          )) : <li className="list-group-item text-muted">No options found</li>}
        </ul>
      )}
    </div>
  );
}
