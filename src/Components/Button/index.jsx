import React from 'react'
import './styles.css';

// type - text, block
// variant - primary
export default function Button({
    className,
    children,
    onClick,
    type = 'block',
    variant = 'primary',
    disabled = false
}) {
    return (
        <button
            className={`btn ${className} ${variant}-btn ${type}-btn${disabled ? ' disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}