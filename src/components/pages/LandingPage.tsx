import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1 className="landing-headline">Stop Missing The Right Jobs.</h1>
                <p className="landing-subtext">Precision-matched job discovery delivered daily at 9AM.</p>
                <div className="landing-cta">
                    <Button size="lg" onClick={() => navigate('/settings')}>
                        Start Tracking
                    </Button>
                </div>
            </div>
        </div>
    );
};
