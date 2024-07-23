import React from 'react';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import ArticleComment from './ArticleComment';
import ArticleCommentForm from './ArticleCommentForm';
import useArticleCommentsQuery from '../hooks/useArticleCommentsQuery';

function ArticleComments() {
    const { isAuth } = useAuth();
    const { isArticleCommentsLoading, articleComments, articleCommentsError } = useArticleCommentsQuery();

    if (!isAuth) {
        return (
            <p>
                <Link to='/login'>Sign in</Link> or
                <Link to='/register'>Sign up</Link> to add a comment on this article
            </p>
        );
    }

    return (
        <div>
            <ArticleCommentForm />

            {isArticleCommentsLoading ? (
                <p>Loading comments...</p>
            ) : (
                articleComments?.comments?.map((comment) => (
                    <ArticleComment key={comment.id} comment={comment} />
                ))
            )}
        </div>
    );
}

export default ArticleComments;