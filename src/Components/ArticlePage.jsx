import moment from "moment";
import React, { useState, useEffect, useRef, use } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ArticlePage() {
  const [article, setArticle] = useState({ user: {}, comments: [] });
  const articleId = useParams();
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const commentInputRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:4000/articles/${articleId.id}`) // Adjust API URL as needed
      .then((response) => response.json())
      .then((data) => setArticle(data.article)) // Save articles in state
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  const formattedDate = moment(article.createdAt).format("dddd, DD. MMMM YYYY");
  const commentsCount =
    article.comments.length > 0 ? article.comments.length : "No";

  const handleGoBack = () => {
    navigate("/");
  };

  const handleComment = async (e) => {
    const username = nameInputRef.current.value;
    const content = commentInputRef.current.value;

    try {
      const response = await fetch(
        `http://localhost:3000/articles/${article.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify JSON format
          },
          body: JSON.stringify({ content, username }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const data = await response.json();
      console.log("Comment posted successfully:", data);

      // Optionally clear input fields after successful submission
      nameInputRef.current.value = "";
      commentInputRef.current.value = "";
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="article">
      <div className="article-top">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-date-author">
          <p className="article-date">{formattedDate}</p>
          <p className="article-author">by {article.user.username}</p>
        </div>
      </div>
      <div className="article-main">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="article-back" onClick={handleGoBack}>
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
            className="lucide lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Go Back
        </div>
        <div className="article-comments">
          <div className="article-comments-count">
            <h1>
              {commentsCount} {commentsCount == 1 ? "Comment" : "Comments"}
            </h1>
          </div>
          <form>
            <div className="comment-input">
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                ref={nameInputRef}
              />
              <input
                type="text"
                placeholder="Comment"
                name="comment"
                required
                ref={commentInputRef}
              />
            </div>
            <button className="add-comment-btn" onClick={handleComment}>
              Add Comment{" "}
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
                className="lucide lucide-message-square"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </form>
          {article.comments.map((comment) => {
            const formattedDate = moment(comment.createdAt).format(
              "DD. MMM. YYYY",
            );
            return (
              <div className="article-comment" key={comment.id}>
                <h3>
                  From: <span>{comment.username} </span>
                  on {formattedDate}
                  <p>
                    <em>{comment.content}</em>
                  </p>
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
