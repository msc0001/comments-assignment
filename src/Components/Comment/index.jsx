import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import Button from "../Button";
import { getTimeString } from "../../Helpers/time";
import CommentForm from "../CommentForm";
import DeleteIcon from "../Icons/DeleteIcon";
import { deleteCommentAction } from "../../Store/actions";
import MessageWrapper from "../Message";

const Time = memo(({ time }) => {
    const [timeString, setTimeString] = useState(getTimeString(time));

    useEffect(() => {
        const i = setInterval(() => setTimeString(getTimeString(time)), 10000);
        return () => clearInterval(i);
    }, [time]);

    return <span className="date">{timeString}</span>;
});

export default function Comment({ id, allowReply }) {
    const comment = useSelector((state) => state.commentDetails[id]);
    const childrenComments = useSelector((state) => state.connections[id]);

    const hasChildren =
        Array.isArray(childrenComments) && !!childrenComments.length;

    const [showReplyForm, setShowReplyForm] = useState(hasChildren);
    const [enableEditComment, setEnableEditComment] = useState(false);

    const deleteComment = useCallback(() => deleteCommentAction(id), [id]);

    const replyToComment = useCallback(() => {
        setShowReplyForm(true);
    }, []);

    const editComment = () => setEnableEditComment(true);
    const cancelEditComment = () => setEnableEditComment(false);

    if (!comment) {
        return null || id + " Not available";
    }

    const { name, message, createdAt } = comment;

    const renderReplies = () => {
        return (
            <div className="comment-replies">
                {showReplyForm && <CommentForm parent={id} label={"Reply"} />}
                {hasChildren &&
                    childrenComments?.map((commentId) => (
                        <Comment key={commentId} id={commentId} />
                    ))}
            </div>
        );
    };

    return (
        <div className="comment-wrapper">
            <div id={id} className="comment wrapper">
                <div className="head">
                    <h5>{name}</h5>
                    <Time time={createdAt} />
                </div>
                <MessageWrapper
                    commentId={id}
                    message={message}
                    enableEditComment={enableEditComment}
                    cancelEditComment={cancelEditComment}
                />
                <div className="actions">
                    {allowReply ? (
                        <Button variantType="text" onClick={replyToComment}>
                            Reply
                        </Button>
                    ) : null}
                    <Button variantType="text" onClick={editComment}>
                        Edit
                    </Button>
                </div>
                <Button className="delete-comment-btn" onClick={deleteComment}>
                    <DeleteIcon size={10} />
                </Button>
            </div>
            {renderReplies()}
        </div>
    );
}
