import React from 'react';
import classNames from 'classnames';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    ...props
}) => {
    return (
        <button
            className={classNames(
                'btn',
                `btn--${variant}`,
                `btn--${size}`,
                { 'btn--full-width': fullWidth },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
