import React, { useEffect, useState } from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Lock, Rocket, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ShipPage.css';

export const ShipPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerTestProgress');
        if (saved) {
            const parsed = JSON.parse(saved);
            const passedCount = Object.values(parsed).filter(Boolean).length;
            // Assuming 10 test items as per requirement
            if (passedCount >= 10) {
                setIsLocked(false);
            }
        }
    }, []);

    if (isLocked) {
        return (
            <PrimaryWorkspace>
                <ContextProvider
                    title="Launch Control"
                    description="Restricted Area."
                />
                <div className="ship-locked-container">
                    <Card padding="lg" className="locked-card">
                        <div className="locked-icon">
                            <Lock size={48} />
                        </div>
                        <h3>Launch Pad Locked</h3>
                        <p>You must complete all pre-flight checks before accessing the shipping controls.</p>
                        <Button onClick={() => navigate('/jt/07-test')}>
                            Go to Pre-Flight Check
                        </Button>
                    </Card>
                </div>
            </PrimaryWorkspace>
        );
    }

    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Launch Control"
                description="Your application is ready for deployment."
            />
            <div className="ship-success-container">
                <Card padding="lg" className="success-card">
                    <div className="success-icon">
                        <Rocket size={48} />
                    </div>
                    <h3>All Systems Go!</h3>
                    <p>Congratulations! Your Job Notification Tracker has passed all tests and is ready for production.</p>

                    <div className="deployment-steps">
                        <h4>Deployment Checklist</h4>
                        <div className="step-item">
                            <CheckCircle size={16} className="step-check" />
                            <span>Codebase Verified</span>
                        </div>
                        <div className="step-item">
                            <CheckCircle size={16} className="step-check" />
                            <span>Tests Passed (10/10)</span>
                        </div>
                        <div className="step-item">
                            <CheckCircle size={16} className="step-check" />
                            <span>Assets Optimized</span>
                        </div>
                    </div>

                    <Button variant="secondary" onClick={() => window.open('https://github.com/wtfkebo/JobNotificationTracker', '_blank')}>
                        View Repository
                    </Button>
                </Card>
            </div>
        </PrimaryWorkspace>
    );
};
