import React, { useState } from 'react'
import './styles.css';
import { addCommentAction } from '../../Store';
import InputComponent from '../InputComponent';
import Button from '../Button';


export default function CommentForm({
    parentId,
    label = 'Comment'
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
            <h5 className='form-label'>{label}</h5>
            <div className='form-content'>
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
            </div>
            <div className='form-actions'>
                <Button type="submit">POST</Button>
            </div>
        </form>
    );
}