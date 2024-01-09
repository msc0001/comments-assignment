import React from 'react'
import './styles.css';

// variantType - text, block
// variant - primary
export default function Button({
    className,
    children,
    onClick,
    type = 'button',
    variantType = 'block',
    variant = 'primary',
    disabled = false
}) {
    return (
        <button
            type={type}
            className={`btn ${variant}-btn ${variantType}-btn${disabled ? ' disabled' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}