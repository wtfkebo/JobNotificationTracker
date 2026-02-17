import React from 'react';
import './PrimaryWorkspace.css';

interface PrimaryWorkspaceProps {
    children: React.ReactNode;
}

export const PrimaryWorkspace: React.FC<PrimaryWorkspaceProps> = ({ children }) => {
    return (
        <div className="primary-workspace">
            {children}
        </div>
    );
};
