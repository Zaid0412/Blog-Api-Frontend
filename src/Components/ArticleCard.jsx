import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function ArticleCard({ article }) {
  const formattedDate = moment(article.createdAt).format("dddd, DD. MMMM YYYY");
  const extractFirstParagraph = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const firstParagraph = doc.querySelector("p");
    return firstParagraph ? firstParagraph.textContent : "";
  };
  const commentsCount = article.comments.length;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/articles/${article.id}`);
  };

  //  <div dangerouslySetInnerHTML={{ __html: processedContent }} />;

  return (
    // Only render if the article is published
    article.isPublished && (
      <div className="article-card" onClick={handleClick}>
        <p className="article-card-date">{formattedDate}</p>
        <h1 className="article-card-title">{article.title}</h1>
        <p className="article-card-content">
          {extractFirstParagraph(article.content)}
        </p>
        <div className="article-card-icons">
          <div className="article-card-comments">
            <p>{commentsCount}</p>
            {/* Comment Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="article-card-more">
            <p>Read More</p>
            {/* Read More Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    )
  );
}
