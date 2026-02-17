import React from 'react';
import './TopBar.css';
import { CheckCircle2, Circle, Disc } from 'lucide-react';
import classNames from 'classnames';

interface TopBarProps {
    projectName?: string;
    currentStep: number;
    totalSteps: number;
    status?: 'not-started' | 'in-progress' | 'shipped';
}

export const TopBar: React.FC<TopBarProps> = ({
    projectName = "KodNest Premium Build System",
    currentStep,
    totalSteps,
    status = 'not-started',
}) => {
    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <span className="project-name">{projectName}</span>
            </div>

            <div className="top-bar-center">
                <span className="step-indicator">Step {currentStep} / {totalSteps}</span>
            </div>

            <div className="top-bar-right">
                <div className={classNames('status-badge', `status-${status}`)}>
                    {status === 'not-started' && <Circle size={14} />}
                    {status === 'in-progress' && <Disc size={14} className="animate-spin-slow" />}
                    {status === 'shipped' && <CheckCircle2 size={14} />}
                    <span className="status-text">
                        {status.replace('-', ' ')}
                    </span>
                </div>
            </div>
        </div>
    );
};
