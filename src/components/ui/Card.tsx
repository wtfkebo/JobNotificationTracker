import React from 'react';
import classNames from 'classnames';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    title,
    padding = 'md',
    hoverable = false,
}) => {
    return (
        <div className={classNames('card', `card--padding-${padding}`, { 'card--hoverable': hoverable }, className)}>
            {title && <h3 className="card-title">{title}</h3>}
            {children}
        </div>
    );
};
