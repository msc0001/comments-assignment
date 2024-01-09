import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Comment from '../Comment';
import { initialiseCommentsAction } from '../../Store';

export default function CommentList() {
    const comments = useSelector(state => state.comments);

    useEffect(() => {
        initialiseCommentsAction();
    }, [])

    if (!Array.isArray(comments)) {
        return null;
    }

    return (
        <div className='comments-cointainer'>
            {comments.map(commentId => 
                <Comment key={commentId} id={commentId} allowReply />
            )}
        </div>
    )
}