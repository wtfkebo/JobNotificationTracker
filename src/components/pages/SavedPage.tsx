import React from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Card } from '../ui/Card';
import { Bookmark } from 'lucide-react';
import './DashboardPage.css'; // Reusing empty state styles

export const SavedPage: React.FC = () => {
    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Saved Jobs"
                description="Your curated collection of opportunities."
            />

            <div className="dashboard-empty-state">
                <Card className="empty-card" padding="lg">
                    <div className="empty-content">
                        <div className="empty-icon-wrapper">
                            <Bookmark size={48} strokeWidth={1} />
                        </div>
                        <h3 className="empty-title">No saved jobs</h3>
                        <p className="empty-description">
                            Jobs you bookmark will appear here for easy access.
                        </p>
                    </div>
                </Card>
            </div>
        </PrimaryWorkspace>
    );
};
