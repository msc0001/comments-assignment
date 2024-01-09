import React from 'react'

export default function InputComponent({
    name,
    label,
    value,
    onChange,
    type = 'text'
}) {
    return <div className='input-container'>
        <label htmlFor={name}>{label}</label>
        {
            type === 'textarea'
            ? <textarea name={name} className="input-box" value={value} onChange={onChange} />
            : <input name={name} type={type} className='input-box' value={value} onChange={onChange} />
        }
    </div>
}