import React, { useState, useEffect } from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle, AlertTriangle, RefreshCw, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './TestPage.css';

interface TestItem {
    id: string;
    label: string;
    tooltip?: string;
}

const TEST_ITEMS: TestItem[] = [
    { id: 'prefs_persist', label: 'Preferences persist after refresh', tooltip: 'Reload the page and check if settings remain.' },
    { id: 'match_score', label: 'Match score calculates correctly', tooltip: 'Verify scores based on your settings.' },
    { id: 'match_toggle', label: '"Show only matches" toggle works', tooltip: 'Enable toggle and ensure low scores hide.' },
    { id: 'save_persist', label: 'Save job persists after refresh', tooltip: 'Save a job, reload, check Saved tab.' },
    { id: 'apply_new_tab', label: 'Apply opens in new tab', tooltip: 'Click Apply and check tab behavior.' },
    { id: 'status_persist', label: 'Status update persists after refresh', tooltip: 'Change status, reload, verify badge.' },
    { id: 'status_filter', label: 'Status filter works correctly', tooltip: 'Filter by "Applied" and check results.' },
    { id: 'digest_gen', label: 'Digest generates top 10 by score', tooltip: 'Check Digest page for high scores.' },
    { id: 'digest_persist', label: 'Digest persists for the day', tooltip: 'Reload Digest page, ensure same jobs.' },
    { id: 'no_console', label: 'No console errors on main pages', tooltip: 'Open DevTools (F12) and check Console.' },
];

export const TestPage: React.FC = () => {
    const navigate = useNavigate();
    const [checks, setChecks] = useState<Record<string, boolean>>({});
    const [passCount, setPassCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerTestProgress');
        if (saved) {
            const parsed = JSON.parse(saved);
            setChecks(parsed);
            setPassCount(Object.values(parsed).filter(Boolean).length);
        }
    }, []);

    const toggleCheck = (id: string) => {
        const newChecks = { ...checks, [id]: !checks[id] };
        setChecks(newChecks);
        setPassCount(Object.values(newChecks).filter(Boolean).length);
        localStorage.setItem('jobTrackerTestProgress', JSON.stringify(newChecks));
    };

    const handleReset = () => {
        if (confirm('Reset all test progress?')) {
            setChecks({});
            setPassCount(0);
            localStorage.removeItem('jobTrackerTestProgress');
        }
    };

    const allPassed = passCount === TEST_ITEMS.length;

    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="System Pre-Flight Check"
                description="Verify core functionality before shipping."
            />

            <div className="test-page-container">
                <Card padding="lg" className="test-results-card">
                    <div className="test-header">
                        <div className="test-score">
                            <h2 className={allPassed ? 'score-pass' : 'score-pending'}>
                                Tests Passed: {passCount} / {TEST_ITEMS.length}
                            </h2>
                            {allPassed ? (
                                <div className="status-badge pass">
                                    <CheckCircle size={16} /> Ready to Ship
                                </div>
                            ) : (
                                <div className="status-badge fail">
                                    <AlertTriangle size={16} /> Resolution Required
                                </div>
                            )}
                        </div>
                        {!allPassed && (
                            <p className="test-warning">Resolve all issues before shipping.</p>
                        )}
                    </div>

                    <div className="checklist-wrapper">
                        {TEST_ITEMS.map((item) => (
                            <label key={item.id} className="checklist-item">
                                <input
                                    type="checkbox"
                                    checked={!!checks[item.id]}
                                    onChange={() => toggleCheck(item.id)}
                                />
                                <span className="checkmark"></span>
                                <div className="item-content">
                                    <span className="item-label">{item.label}</span>
                                    {item.tooltip && (
                                        <span className="item-tooltip">{item.tooltip}</span>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="test-actions">
                        <Button variant="secondary" onClick={handleReset} className="reset-btn">
                            <RefreshCw size={14} /> Reset Test Status
                        </Button>
                        <Button
                            disabled={!allPassed}
                            onClick={() => navigate('/jt/08-ship')}
                            className="ship-btn"
                        >
                            {allPassed ? 'Proceed to Ship' : <><Lock size={14} /> Locked</>}
                        </Button>
                    </div>
                </Card>
            </div>
        </PrimaryWorkspace>
    );
};
