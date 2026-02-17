import React from 'react';
import classNames from 'classnames';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    title,
    padding = 'md',
}) => {
    return (
        <div className={classNames('card', `card--padding-${padding}`, className)}>
            {title && <h3 className="card-title">{title}</h3>}
            {children}
        </div>
    );
};
