import React, { useEffect, useState } from "react";
import axios from "axios";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [comment, setComment] = useState("");

  // fetch articles
  const getArticles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/user-api/articles",
        { withCredentials: true }
      );
      setArticles(res.data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  // add comment
  const addComment = async (articleId) => {
    try {
      await axios.put(
        "http://localhost:5000/user-api/articles/comment",
        { articleId, comment },
        { withCredentials: true }
      );
      alert("Comment added");
      setComment("");
      getArticles(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <h2>Articles</h2>

      {articles.map((a) => (
        <div key={a._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{a.title}</h3>
          <p><b>Category:</b> {a.category}</p>
          <p>{a.content}</p>

          <input
            type="text"
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={() => addComment(a._id)}>Comment</button>

          <h4>Comments:</h4>
          {a.comments.map((c, i) => (
            <p key={i}>{c.comment}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Articles;