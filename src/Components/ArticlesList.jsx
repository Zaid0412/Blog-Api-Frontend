import ArticleCard from "./ArticleCard";
import { useOutletContext } from "react-router-dom";

export default function ArticlesList() {
  const articles = useOutletContext();
  return (
    <div className="articles">
      {articles.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
}
