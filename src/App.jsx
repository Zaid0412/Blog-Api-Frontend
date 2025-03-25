import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [articlesOrder, setArticlesOrder] = useState("all");
  const [loading, setLoading] = useState(false); // New loading state
  const linksRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // Start loading

      try {
        const response = await fetch(
          `http://localhost:4000/articles/${articlesOrder}`,
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchArticles();
  }, [articlesOrder]);

  const activateLink = (e) => {
    e.preventDefault();

    if (e.target.textContent !== "Admin") {
      const links = linksRef.current.querySelectorAll("a");
      navigate("/");

      links.forEach((link) => link.classList.remove("active"));

      if (e.target.tagName === "H2") {
        e.target.parentNode.classList.add("active");
      }
      setArticlesOrder(e.target.textContent.toLowerCase());
    }
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
      <Sidebar searchArticles={searchArticles} />
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

        {/* Show Loading Spinner when fetching */}
        {loading ? (
          <div className="loader"></div>
        ) : (
          <Outlet context={articles} />
        )}
      </main>
    </div>
  );
}

export default App;
