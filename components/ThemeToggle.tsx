"use client";

import React, { useState, useEffect } from 'react';
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default false for SSR

  // Initialize theme after mount
  useEffect(() => {
    setIsMounted(true);
    const savedMode = localStorage.getItem('gitresume-darkMode') === 'enabled';
    setIsDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('gitresume-darkMode', newMode ? 'enabled' : 'disabled');
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Render placeholder during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <button 
        className="z-50 p-3 border-none outline-none" 
        aria-hidden="true"
      >
        <div className="w-8 h-8" /> {/* Inert placeholder */}
      </button>
    );
  }

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