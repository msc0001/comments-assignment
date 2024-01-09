import React, { useState } from 'react'
import { addCommentAction } from '../../Store';
import InputComponent from '../InputComponent';


export default function CommentForm({
    parentId
}) {
    const [form, setForm] = useState({
        senderName: '',
        message: ''
    });
    
    const postComment = () => {
        addCommentAction({
            message: form.message.trim(),
            name: form.name.trim(),
            parentId: parentId,
        })
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form className='comment-form wrapper' onSubmit={postComment}>
            <InputComponent
                name="senderName"
                value={form.senderName}
                onChange={handleInputChange}
            />
            <InputComponent
                type="textarea"
                name="message"
                value={form.message}
                onChange={handleInputChange}
            />
        </form>
    );
}