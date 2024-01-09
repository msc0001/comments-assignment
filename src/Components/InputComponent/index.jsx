import React from 'react'
import './styles.css';

export default function InputComponent({
    name,
    label,
    value,
    onChange,
    type = 'text'
}) {
    const props = { 
        name,
        className: 'input-box',
        value,
        onChange,
        placeholder: label
    }
    return <div className='input-container'>
        {/* <label htmlFor={name}>{label}</label> */}
        {
            type === 'textarea'
            ? <textarea {...props} />
            : <input type={type} {...props} />
        }
    </div>
}