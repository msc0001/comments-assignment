import React, { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import './styles.css';
import Button from '../Button';
import { getTimeString } from '../../Helpers/time';
import CommentForm from '../CommentForm';
import DeleteIcon from '../Icons/DeleteIcon';
import { deleteCommentAction } from '../../Store/actions';

const Time = memo(({ time }) => {
    return <span className='date'>{getTimeString(time)}</span>
})

const Message = ({ message, limit = 120 }) => {
    const [show, setShow] = useState(false);
    
    if (message?.length + 3 <= limit) {
        return message;
    }

    return <span className='message-text-container'>
        {show ? message : (message.substring(0, limit - 3) + "...")}
        <Button 
            variantType='text'
            className={"show-message-btn"}
            onClick={() => setShow(prev => !prev)}
        >
            {show ? 'Show less' : 'Show more'}
        </Button>
    </span>
}

export default function Comment({ id, allowReply }) {
    const comment = useSelector(state => state.commentDetails[id]);
    const childrenComments  = useSelector(state => state.connections[id]);

    const hasChildren = Array.isArray(childrenComments) && !!childrenComments.length;

    const [showReplyForm, setShowReplyForm] = useState(hasChildren);

    const deleteComment = useCallback(() => deleteCommentAction(id), [id]);
    
    const replyToComment = useCallback(() => {
        setShowReplyForm(true);
    }, [])
    
    const editComment = useCallback(() => {
        // TODO: implement
        console.log('edit', id);
    }, [id])

    if (!comment) {
        return null || id + ' Not available';
    }

    const { name, message, edited, createdAt } = comment;

    const renderReplies = () => {
        return (
            <div className='comment-replies'>
                {showReplyForm && <CommentForm parent={id} label={'Reply'} />}
                {hasChildren && childrenComments?.map(commentId => 
                    <Comment key={commentId} id={commentId} />
                )}
            </div>  
        )
    }

    return (
        <div className='comment-wrapper'>
            <div id={id} className='comment wrapper'>
                <div className='head'>
                    <h5>{name}</h5>
                    <Time time={createdAt} />
                </div>
                <p className='message'>
                    {edited ? (<span className='edited-tag'>Edited</span>) : null}
                    <Message message={message} />
                </p>
                <div className='actions'>
                    {allowReply
                      ? <Button 
                            variantType='text'
                            onClick={replyToComment}
                        >
                            Reply
                        </Button> : null}
                    <Button variantType='text' onClick={editComment}>Edit</Button>
                </div>
                <Button className="delete-comment-btn" onClick={deleteComment}>
                    <DeleteIcon size={10} />
                </Button>
            </div>
            {renderReplies()}
        </div>
    );
}