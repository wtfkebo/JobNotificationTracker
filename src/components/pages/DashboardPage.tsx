import React from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Card } from '../ui/Card';
import { Inbox } from 'lucide-react';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Dashboard"
                description="Your daily job matches."
            />

            <div className="dashboard-empty-state">
                <Card className="empty-card" padding="lg">
                    <div className="empty-content">
                        <div className="empty-icon-wrapper">
                            <Inbox size={48} strokeWidth={1} />
                        </div>
                        <h3 className="empty-title">No jobs yet</h3>
                        <p className="empty-description">
                            In the next step, you will load a realistic dataset.
                        </p>
                    </div>
                </Card>
            </div>
        </PrimaryWorkspace>
    );
};
