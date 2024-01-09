import React, { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import './styles.css';
import { deleteCommentAction } from '../../Store';
import Button from '../Button';
import { getTimeString } from '../../Helpers/time';

const Time = memo(({ time }) => {
    return <span className='date'>{getTimeString(time)}</span>
})

export default function Comment({ id }) {
    const { comment, childrenComments }  = useSelector(state => ({
        comment: state.commentDetails[id],
        childrenComments: state.connections[id]
    }));

    const deleteComment = useCallback(() => deleteCommentAction(id), [id]);

    if (!comment) {
        return null || id + ' Not available';
    }

    const { name, message, edited, createdAt, parent } = comment;

    const renderReplies = () => {
        if (!Array.isArray(childrenComments) || !childrenComments.length)  {
            return null;
        }

        return (
            <div className='comment-replies'>
                {childrenComments.map(id => <Comment key={id} id={id} />)}
            </div>
        )
    }

    return (
        <div className='comment-wrapper'>
            <div className='comment wrapper'>
                <div className='head'>
                    <h5>{name} {`${parent}`}</h5>
                    <Time time={createdAt} />
                </div>
                <p className='message'>
                    {edited ? (<span></span>) : null}
                    {message}
                </p>
                <div className='actions'>
                    <Button type='text'>Reply</Button>
                    <Button type='text'>Edit</Button>
                </div>
                <Button className="delete-comment-btn" onClick={deleteComment}>d</Button>
            </div>
            {renderReplies()}
        </div>
    );
}