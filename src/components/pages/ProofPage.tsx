import React from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Card } from '../ui/Card';
import { ClipboardCheck } from 'lucide-react';
import './DashboardPage.css'; // Reusing empty state styles

export const ProofPage: React.FC = () => {
    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Proof"
                description="Verification artifacts and logs."
            />

            <div className="dashboard-empty-state">
                <Card className="empty-card" padding="lg">
                    <div className="empty-content">
                        <div className="empty-icon-wrapper">
                            <ClipboardCheck size={48} strokeWidth={1} />
                        </div>
                        <h3 className="empty-title">Artifact Collection</h3>
                        <p className="empty-description">
                            System proofs and deployment logs will be collected here.
                        </p>
                    </div>
                </Card>
            </div>
        </PrimaryWorkspace>
    );
};
