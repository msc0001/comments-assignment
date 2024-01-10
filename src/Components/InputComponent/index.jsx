import React from "react";
import "./styles.css";

export default function InputComponent({
    name,
    label,
    value,
    onChange,
    error,
    type = "text",
}) {
    const props = {
        name,
        className: "input-box",
        value,
        onChange,
        autoComplete: "off",
        placeholder: label,
    };

    if (error) {
        props.className += ` invalid`;
    }

    return (
        <div className={`input-container${error ? " invalid" : ""}`}>
            {/* <label htmlFor={name}>{label}</label> */}
            {type === "textarea" ? (
                <textarea {...props} />
            ) : (
                <input type={type} {...props} />
            )}
            <p className={`hint-text ${error ? "error-text" : ""}`}>{error}</p>
        </div>
    );
}
