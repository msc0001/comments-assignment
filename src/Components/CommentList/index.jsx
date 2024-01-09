import React from 'react'
import { useSelector } from 'react-redux'
import Comment from '../Comment';
import CommentForm from '../CommentForm';
import CommentsSortBy from '../CommentsSortBy';

export default function CommentList() {
    const comments = useSelector(state => state.comments);

    return (
        <div className='comments-cointainer'>
            <CommentForm />
            <CommentsSortBy />
            {Array.isArray(comments) && comments.map(commentId => 
                <Comment key={commentId} id={commentId} allowReply />
            )}
        </div>
    )
}