import React, { useState } from 'react'
import './styles.css';
import InputComponent from '../InputComponent';
import Button from '../Button';
import { addCommentAction } from '../../Store/actions';

const formInitialState = {
    senderName: '',
    commentMessage: ''
};

export default function CommentForm({
    parent,
    label = 'Comment'
}) {
    const [form, setForm] = useState(formInitialState);
    const [erroredFields, setErroredFields] = useState({});
    
    const postComment = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const name = form.senderName.trim();
        const message = form.commentMessage.trim();

        if (!name || !message) {
            setErroredFields({
                senderName: !name,
                commentMessage: !message
            })
            return;
        }

        addCommentAction({
            parent: parent,
            message,
            name,
        })
        setForm(formInitialState);
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (value) {
            setErroredFields(prev => ({
                ...prev,
                [name]: false
            }))
        }

        const limit = 250;

        if (value.length > limit) {
            value = value.substring(0, limit);
        }

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form className='comment-form wrapper' onSubmit={postComment}>
            <h5 className='form-label'>{label}</h5>
            <div className='form-content'>
                <InputComponent
                    label="Name"
                    name="senderName"
                    value={form.senderName}
                    error={erroredFields.senderName}
                    onChange={handleInputChange}
                />
                <InputComponent
                    label={label}
                    type="textarea"
                    name="commentMessage"
                    value={form.commentMessage}
                    error={erroredFields.commentMessage}
                    onChange={handleInputChange}
                />
            </div>
            <div className='form-actions'>
                <Button type="submit">POST</Button>
            </div>
        </form>
    );
}