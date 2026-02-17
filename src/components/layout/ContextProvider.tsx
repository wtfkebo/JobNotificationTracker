import React from 'react';
import './ContextProvider.css';

interface ContextProviderProps {
    title: string;
    description?: string;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
    title,
    description,
}) => {
    return (
        <div className="context-provider">
            <h1 className="context-title">{title}</h1>
            {description && <p className="context-description">{description}</p>}
        </div>
    );
};
