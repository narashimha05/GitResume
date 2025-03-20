"use client";

import React, { useState, useEffect } from 'react';
import { IoSunnyOutline,IoMoonOutline } from "react-icons/io5";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gitresume-darkMode') === 'enabled';
    }
    return false;
  });

  const toggleTheme = () => {
     setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('gitresume-darkMode', newMode ? 'enabled' : 'disabled');
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="z-50 p-3 border-none outline-none"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <IoMoonOutline className="w-8 h-8 text-black dark:text-white" />
      ) : (
        <IoSunnyOutline className="w-8 h-8 text-black dark:text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
