import React from 'react';
import classNames from 'classnames';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    className,
    label,
    error,
    id,
    ...props
}) => {
    const inputId = id || props.name;

    return (
        <div className={classNames('input-wrapper', className)}>
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={classNames('input-field', { 'input-field--error': error })}
                {...props}
            />
            {error && <span className="input-error">{error}</span>}
        </div>
    );
};
