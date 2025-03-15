import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ArticlesList from "./Components/ArticlesList.jsx";
import ArticlePage from "./Components/ArticlePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ArticlesList /> },
      { path: "/articles/:id", element: <ArticlePage /> },
    ],
  },
]);

export default router;
