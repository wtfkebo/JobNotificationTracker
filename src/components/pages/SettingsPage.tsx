import React, { useState, useEffect } from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { DEFAULT_PREFERENCES } from '../../utils/matching';
import type { Preferences } from '../../utils/matching';
import './SettingsPage.css';

export const SettingsPage: React.FC = () => {
    const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFERENCES);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPrefs(JSON.parse(savedPrefs));
        }
    }, []);

    const handleChange = (field: keyof Preferences, value: any) => {
        setPrefs(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleArrayChange = (field: keyof Preferences, value: string) => {
        // Split by comma and trim
        const array = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
        setPrefs(prev => ({ ...prev, [field]: array }));
        setSaved(false);
    };

    const toggleMode = (mode: 'Remote' | 'Hybrid' | 'Onsite') => {
        setPrefs(prev => {
            const current = prev.preferredMode;
            const exists = current.includes(mode);
            const newModes = exists
                ? current.filter(m => m !== mode)
                : [...current, mode];
            return { ...prev, preferredMode: newModes };
        });
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Settings"
                description="Configure your job matching preferences."
            />

            <div className="settings-container">
                <Card title="Role & Skills" className="settings-card">
                    <Input
                        label="Role Keywords (comma separated)"
                        placeholder="e.g. Frontend, React, Senior Engineer"
                        defaultValue={prefs.roleKeywords.join(', ')}
                        onBlur={(e) => handleArrayChange('roleKeywords', e.target.value)}
                    />
                    <Input
                        label="Key Skills (comma separated)"
                        placeholder="e.g. TypeScript, Node.js, AWS"
                        defaultValue={prefs.skills.join(', ')}
                        onBlur={(e) => handleArrayChange('skills', e.target.value)}
                        style={{ marginTop: 'var(--space-4)' }}
                    />
                </Card>

                <Card title="Location & Mode" className="settings-card">
                    <Input
                        label="Preferred Locations (comma separated)"
                        placeholder="e.g. Bangalore, Mumbai, Remote"
                        defaultValue={prefs.preferredLocations.join(', ')}
                        onBlur={(e) => handleArrayChange('preferredLocations', e.target.value)}
                    />

                    <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                        <label className="input-label">Preferred Mode</label>
                        <div className="checkbox-group">
                            {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                                <label key={mode} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={prefs.preferredMode.includes(mode as any)}
                                        onChange={() => toggleMode(mode as any)}
                                    />
                                    {mode}
                                </label>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card title="Experience & Threshold" className="settings-card">
                    <div className="form-group">
                        <label className="input-label">Experience Level</label>
                        <select
                            className="settings-select"
                            value={prefs.experienceLevel}
                            onChange={(e) => handleChange('experienceLevel', e.target.value)}
                        >
                            <option value="">Select Level</option>
                            <option value="Fresher">Fresher</option>
                            <option value="0-1">0-1 Years</option>
                            <option value="1-3">1-3 Years</option>
                            <option value="3-5">3-5 Years</option>
                            <option value="5+">5+ Years</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                        <label className="input-label">
                            Minimum Match Score: {prefs.minMatchScore}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            className="range-input"
                            value={prefs.minMatchScore}
                            onChange={(e) => handleChange('minMatchScore', parseInt(e.target.value))}
                        />
                    </div>
                </Card>

                <div className="settings-actions">
                    <Button onClick={handleSave} className="save-btn">
                        {saved ? 'Saved!' : 'Save Preferences'}
                    </Button>
                </div>
            </div>
        </PrimaryWorkspace>
    );
};
