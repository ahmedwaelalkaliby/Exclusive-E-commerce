import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';

const options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

export default function SearchableDropdown() {
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchText.toLowerCase()));

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setSearchText('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
    <div className="relative w-full max-w-xs">
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        placeholder={selectedOption || 'Search options...'}
        value={searchText}
        onChange={(event: ChangeEvent<HTMLInputElement>) => { setSearchText(event.target.value); setActiveIndex(0); setIsOpen(true); }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-autocomplete="list"
      />
      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg" role="listbox">
          {filteredOptions.length ? filteredOptions.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={index === activeIndex}
              className={`cursor-pointer px-4 py-2 text-sm ${index === activeIndex ? 'bg-red-600 text-white' : 'text-slate-800 hover:bg-slate-100'}`}
              onMouseDown={() => selectOption(option)}
            >{option}</li>
          )) : <li className="px-4 py-2 text-sm text-slate-500">No options found</li>}
        </ul>
      )}
    </div>
  );
}
