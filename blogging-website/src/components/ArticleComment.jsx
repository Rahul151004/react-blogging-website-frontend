import React from "react";
import { useAuth } from "../hooks";
import { Link, useParams } from "react-router-dom";
import useArticleCommentsQuery from "../hooks/useArticleCommentsQuery";

function ArticleComment({ comment }) {
  const { author, body, createdAt, id } = comment;
  const { authUser } = useAuth();
  const { deleteComment } = useArticleCommentsQuery();
  const { slug } = useParams();

  const canDelete = author?.username === authUser?.username;

  const handleDelete = async () => {
    try {
      await deleteComment({ slug, id });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>

      {id && (
        <div className="card-footer">
          <Link>{author.username}</Link>&nbsp;

          <span className="date-posted">
            {new Date(createdAt).toDateString()}
          </span>

          &nbsp;
          {canDelete && <button onClick={handleDelete}>Delete</button>}
        </div>
      )}
    </div>
  );
}

export default ArticleComment;
