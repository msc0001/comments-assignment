import React, { useState } from "react";
import "./styles.css";
import Button from "../Button";
import InputComponent from "../InputComponent";
import { editCommentAction } from "../../Store/actions";

export const Message = ({ message, limit = 120 }) => {
    const [show, setShow] = useState(false);

    if (message?.length + 3 <= limit) {
        return message;
    }

    return (
        <span className="message-text-container">
            {show ? message : message.substring(0, limit - 3) + "..."}
            <Button
                variantType="text"
                className={"show-message-btn"}
                onClick={() => setShow((prev) => !prev)}
            >
                {show ? "Show less" : "Show more"}
            </Button>
        </span>
    );
};

export const EditableMessage = ({ commentId, message, cancelEditComment }) => {
    const [newMessage, setNewMessage] = useState(message);

    const updateMessage = () => {
        editCommentAction({
            commentId,
            newMessage,
        });
        cancelEditComment();
    };

    return (
        <div className="message">
            <InputComponent
                type="textarea"
                value={newMessage}
                error={!newMessage ? "message can not be empty" : ""}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="actions update-btn-grp">
                <Button
                    className={"update-btn"}
                    variantType="text"
                    onClick={cancelEditComment}
                >
                    Cancel
                </Button>
                <Button
                    className={"update-btn"}
                    variantType="text"
                    onClick={updateMessage}
                >
                    Update
                </Button>
            </div>
        </div>
    );
};

export default function MessageWrapper({
    commentId,
    message,
    enableEditComment,
    cancelEditComment,
}) {
    if (enableEditComment) {
        return (
            <EditableMessage
                commentId={commentId}
                message={message}
                cancelEditComment={cancelEditComment}
            />
        );
    }
    return (
        <p className="message">
            <Message message={message} />
        </p>
    );
}
