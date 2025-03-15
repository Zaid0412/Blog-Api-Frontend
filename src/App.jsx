import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import "./App.css";
import ArticlesList from "./Components/ArticlesList";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState([]);
  const [articlesOrder, setArticlesOrder] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const linksRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/articles/${articlesOrder}`) // Adjust API URL as needed
      .then((response) => response.json())
      .then((data) => setArticles(data.articles)) // Save articles in state
      .catch((error) => console.error("Error fetching articles:", error));
  }, [articlesOrder]);
  console.log(articles);

  useEffect(() => {
    document.body.classList.toggle("light", darkMode);
  }, [darkMode]);

  const activateLink = (e) => {
    e.preventDefault();

    if (e.target.textContent !== "Admin") {
      const links = linksRef.current.querySelectorAll("a");
      navigate("/");

      links.forEach((link) => {
        link.classList.remove("active");
      });

      if (e.target.tagName === "H2") {
        e.target.parentNode.classList.add("active");
      }
      setArticlesOrder(e.target.textContent.toLowerCase());
    }
  };

  const handleTheme = () => {
    setDarkMode(!darkMode);
  };

  const searchArticles = (e) => {
    e.preventDefault();
    setArticlesOrder(`search?searchWord=${e.target.value}`);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <a href="/">
          <h1>Postly</h1>
        </a>
      </nav>
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
      <main className="main">
        <div className="pages" ref={linksRef}>
          <a href="" onClick={activateLink} className="active">
            <h2>All</h2>
          </a>
          <a href="" onClick={activateLink}>
            <h2>Latest</h2>
          </a>
          <a href="" onClick={activateLink}>
            <h2>Admin</h2>
          </a>
        </div>
        <Outlet context={articles} />
      </main>
      <footer>
        <p>
          Developed by <span>@Zaid0412</span>
        </p>
        <a href="https://github.com/Zaid0412/Blog-Api-Backend">
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
