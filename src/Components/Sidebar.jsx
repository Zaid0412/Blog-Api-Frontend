import React, { useEffect, useState } from "react";

export default function Navbar({ searchArticles }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("light", darkMode);
  }, [darkMode]);

  const handleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="sidebar">
      <h1>Search</h1>
      <form>
        <input type="text" id="search-articles" onChange={searchArticles} />
        <button>
          {/* <Search /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </form>
      <button className="theme-btn" onClick={handleTheme}>
        Theme: {!darkMode ? "Dark" : "Light"}
      </button>
    </div>
  );
}
