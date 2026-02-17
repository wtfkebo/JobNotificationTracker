import React from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Card } from '../ui/Card';
import { Sparkles } from 'lucide-react';
import './DashboardPage.css'; // Reusing empty state styles

export const DigestPage: React.FC = () => {
    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Daily Digest"
                description="Your personalized job feed, delivered daily."
            />

            <div className="dashboard-empty-state">
                <Card className="empty-card" padding="lg">
                    <div className="empty-content">
                        <div className="empty-icon-wrapper">
                            <Sparkles size={48} strokeWidth={1} />
                        </div>
                        <h3 className="empty-title">Digest pending</h3>
                        <p className="empty-description">
                            Your first daily digest will arrive tomorrow at 9:00 AM.
                        </p>
                    </div>
                </Card>
            </div>
        </PrimaryWorkspace>
    );
};
