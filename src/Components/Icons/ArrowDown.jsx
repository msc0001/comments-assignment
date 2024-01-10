import React from "react";

export default function ArrowDown({ className, size }) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ArrowDownwardIcon"
        >
            <path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
        </svg>
    );
}
