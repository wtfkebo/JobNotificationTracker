import React from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import './SettingsPage.css';

export const SettingsPage: React.FC = () => {
    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Settings"
                description="Configure your job tracking preferences."
            />

            <div className="settings-container">
                <Card title="Job Preferences" padding="lg">
                    <div className="settings-form">
                        <Input label="Role Keywords" placeholder="e.g. Frontend Developer, React, TypeScript" />
                        <Input label="Preferred Locations" placeholder="e.g. San Francisco, New York, London" />

                        <div className="form-group">
                            <label className="form-label">Mode</label>
                            <div className="mode-options">
                                <Button variant="secondary" size="sm">Remote</Button>
                                <Button variant="secondary" size="sm">Hybrid</Button>
                                <Button variant="secondary" size="sm">Onsite</Button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Experience Level</label>
                            <div className="mode-options">
                                <Button variant="secondary" size="sm">Junior</Button>
                                <Button variant="secondary" size="sm">Mid</Button>
                                <Button variant="secondary" size="sm">Senior</Button>
                                <Button variant="secondary" size="sm">Lead</Button>
                            </div>
                        </div>
                    </div>

                    <div className="settings-actions">
                        <Button>Save Preferences</Button>
                    </div>
                </Card>

                <Card title="Notifications" padding="lg">
                    <div className="settings-form">
                        <Input label="Email Address" placeholder="you@example.com" />
                        <div className="form-group">
                            <label className="form-label">Frequency</label>
                            <p className="form-help">Daily digest at 9:00 AM</p>
                        </div>
                    </div>
                </Card>
            </div>
        </PrimaryWorkspace>
    );
};
