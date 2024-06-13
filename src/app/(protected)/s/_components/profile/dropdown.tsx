"use client"
import React, { useState } from 'react';

interface DropDownProps {
  onOptionSelect: (option: string) => void;
}

export const DropDown: React.FC<DropDownProps> = ({ onOptionSelect }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option: string) => {
    setShowOptions(false);
    onOptionSelect(option);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setShowOptions(!showOptions)}
        >
          Select Option
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707 1.707L5.414 10l5.293 5.293A1 1 0 1110 16.707L3.707 10.414a1 1 0 010-1.414L10 3.707A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showOptions && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleOptionClick('link')}
            >
              Subir Link
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleOptionClick('pdf')}
            >
              Subir PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};




