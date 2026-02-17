import React from 'react';
import './AppLayout.css';
import { TopBar } from './TopBar';
import { ProofFooter } from './ProofFooter';

interface AppLayoutProps {
    children: React.ReactNode;
    step?: number;
    totalSteps?: number;
    status?: 'not-started' | 'in-progress' | 'shipped';
}

export const AppLayout: React.FC<AppLayoutProps> = ({
    children,
    step = 1,
    totalSteps = 5,
    status = 'not-started',
}) => {
    return (
        <div className="app-layout">
            <TopBar currentStep={step} totalSteps={totalSteps} status={status} />
            <main className="main-content">
                {children}
            </main>
            <ProofFooter />
        </div>
    );
};
