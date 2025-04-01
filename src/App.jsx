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
        setArticles([]);
        console.log(articles.length == 0);
        if (articles.length == 0) {
          setArticles([
            {
              id: "fb588799-ed18-40c1-8c37-19ecfd9b6963",
              title: "Understanding Asynchronous JavaScript",
              content: `<h2 data-end="149" data-start="108"><strong data-end="147" data-start="111">What is Asynchronous JavaScript?</strong></h2>
            <p data-end="353" data-start="150">JavaScript is single-threaded, meaning it executes one task at a time. However, asynchronous programming allows it to handle long-running operations like fetching data without blocking the main thread.</p>
            <h2 data-end="353" data-start="150">1. Callbacks (The Old Way)</h2>
            <p data-end="544" data-start="439">Callbacks were the original way of handling asynchronous tasks, but they can lead to <strong data-end="541" data-start="524">callback hell.</strong></p>
            <p><code>function fetchData(callback) {</code><br><code>&nbsp; setTimeout(() =&gt; {</code><br><code>&nbsp; &nbsp; callback("Data received!");</code><br><code>&nbsp; }, 2000);</code><br><code>}</code></p>
            <p><code>fetchData((message) =&gt; {</code><br><code>&nbsp; console.log(message);</code><br><code>});</code></p>
            <p>&nbsp;</p>
            <h3 data-end="753" data-start="717"><strong data-end="751" data-start="721">2. Promises (A Better Way)</strong></h3>
            <p data-end="814" data-start="754">Promises help manage asynchronous operations more cleanly</p>
            <p><code>function fetchData() {</code><br><code>&nbsp; return new Promise((resolve) =&gt; {</code><br><code>&nbsp; &nbsp; setTimeout(() =&gt; {</code><br><code>&nbsp; &nbsp; &nbsp; resolve("Data received!");</code><br><code>&nbsp; &nbsp; }, 2000);</code><br><code>&nbsp; });</code><br><code>}</code></p>
            <p><code>fetchData().then((message) =&gt; console.log(message));</code></p>
            <p>&nbsp;</p>
            <h3 data-end="1065" data-start="1026"><strong data-end="1063" data-start="1030">3. Async/Await (The Best Way)</strong></h3>
            <p data-end="1168" data-start="1066">With <code data-end="1084" data-start="1071">async/await</code>, we can write asynchronous code that looks synchronous, making it easier to read.</p>
            <p><code>async function fetchData() {</code><br><code>&nbsp; return new Promise((resolve) =&gt; {</code><br><code>&nbsp; &nbsp; setTimeout(() =&gt; {</code><br><code>&nbsp; &nbsp; &nbsp; resolve("Data received!");</code><br><code>&nbsp; &nbsp; }, 2000);</code><br><code>&nbsp; });</code><br><code>}</code></p>
            <p><code>async function getData() {</code><br><code>&nbsp; const message = await fetchData();</code><br><code>&nbsp; console.log(message);</code><br><code>}</code></p>
            <p><code>getData();</code></p>
            <h2 data-end="1474" data-start="1435"><strong data-end="1472" data-start="1438">When to Use Asynchronous Code?</strong></h2>
            <ul>
            <li data-end="1502" data-start="1475">Fetching data from APIs</li>
            <li data-end="1539" data-start="1503">Reading/writing files in Node.js</li>
            <li data-end="1570" data-start="1540">Handling user interactions</li>
            <li data-end="1627" data-start="1571">Timed operations (e.g., <code data-end="1609" data-start="1597">setTimeout</code>, <code data-end="1624" data-start="1611">setInterval</code>)</li>
            </ul>
            <h2 data-end="1652" data-start="1629"><strong data-end="1650" data-start="1632">Final Thoughts</strong></h2>
            <p data-end="1801" data-start="1653">Asynchronous JavaScript is crucial for performance and responsiveness. Mastering <code data-end="1747" data-start="1734">async/await</code> will make your code cleaner and easier to maintain.</p>
            <pre data-end="1433" data-start="1170">&nbsp;</pre>
            <h2>&nbsp;</h2>
            <pre data-end="1024" data-start="816">&nbsp;</pre>
            <p>&nbsp;</p>
            <pre data-end="715" data-start="546">&nbsp;</pre>`,
              createdAt: "2025-03-16T10:23:45.132Z",
              isPublished: true,
              userId: "48963a07-8688-4088-838b-def583f04af6",
              comments: [],
            },
          ]);
        }
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
