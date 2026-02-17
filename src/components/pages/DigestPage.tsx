import React, { useState, useEffect } from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Mail, Copy, Zap, Clock, MapPin, Briefcase } from 'lucide-react';
import { jobs as allJobs } from '../../data/jobs';
import {
    generateDigest,
    getExistingDigest,
    getTodayDateString,
    formatDigestForClipboard
} from '../../utils/digest';
import type { Digest } from '../../utils/digest';
import type { Preferences } from '../../utils/matching';
import { getStatusHistory, getStatusLabel, getStatusColor } from '../../utils/status';
import type { StatusHistoryItem } from '../../utils/status';
import './DigestPage.css';

export const DigestPage: React.FC = () => {
    const [digest, setDigest] = useState<Digest | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasPrefs, setHasPrefs] = useState(false);
    const [copied, setCopied] = useState(false);
    const [statusHistory, setStatusHistory] = useState<StatusHistoryItem[]>([]);

    useEffect(() => {
        // Check preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setHasPrefs(true);
            // Check for existing digest
            const today = getTodayDateString();
            const existing = getExistingDigest(today);
            if (existing) {
                setDigest(existing);
            }
        }
        // Load status history
        setStatusHistory(getStatusHistory());
    }, []);

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            const savedPrefs = localStorage.getItem('jobTrackerPreferences');
            if (savedPrefs) {
                const prefs: Preferences = JSON.parse(savedPrefs);
                const newDigest = generateDigest(allJobs, prefs);
                setDigest(newDigest);
            }
            setLoading(false);
        }, 1500); // Simulate processing delay
    };

    const handleCopy = () => {
        if (!digest) return;
        const text = formatDigestForClipboard(digest);
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEmail = () => {
        if (!digest) return;
        const subject = encodeURIComponent(`My 9AM Job Digest - ${digest.date}`);
        const body = encodeURIComponent(formatDigestForClipboard(digest));
        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    if (!hasPrefs) {
        return (
            <PrimaryWorkspace>
                <ContextProvider
                    title="Daily Digest"
                    description="Your curated 9AM job briefing."
                />
                <div className="digest-empty-state">
                    <Card padding="lg" className="digest-msg-card">
                        <div className="digest-icon-wrapper">
                            <Mail size={48} />
                        </div>
                        <h3>Set Preferences First</h3>
                        <p>To generate your personalized daily digest, please configure your preferences in Settings.</p>
                        <Button onClick={() => window.location.href = '/settings'}>Go to Settings</Button>
                    </Card>
                </div>
            </PrimaryWorkspace>
        );
    }

    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Daily Digest"
                description="Your curated 9AM job briefing."
            />

            <div className="digest-container">
                {!digest ? (
                    <div className="digest-empty-state">
                        <Card padding="lg" className="digest-msg-card">
                            <div className="digest-icon-wrapper">
                                <Zap size={48} />
                            </div>
                            <h3>Ready for your 9AM Briefing?</h3>
                            <p>Generate your daily digest based on your latest preferences.</p>
                            <div className="simulation-note">Demo Mode: Daily trigger simulated manually.</div>
                            <Button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="generate-btn"
                            >
                                {loading ? 'Analyzing 60+ Jobs...' : "Generate Today's Digest"}
                            </Button>
                        </Card>
                    </div>
                ) : (
                    <div className="digest-view">
                        <div className="digest-actions">
                            <Button variant="secondary" onClick={handleCopy}>
                                <Copy size={16} />
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </Button>
                            <Button variant="secondary" onClick={handleEmail}>
                                <Mail size={16} />
                                Create Email Draft
                            </Button>
                        </div>

                        <div className="digest-paper">
                            <div className="digest-header">
                                <h1>Top 10 Jobs For You — 9AM Digest</h1>
                                <div className="digest-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            </div>

                            <div className="digest-content">
                                {digest.jobs.length > 0 ? (
                                    digest.jobs.map((item, index) => (
                                        <div key={item.job.id} className="digest-item">
                                            <div className="digest-item-rank">{index + 1}</div>
                                            <div className="digest-item-details">
                                                <div className="digest-item-top">
                                                    <h3 className="digest-job-title">
                                                        <a href={item.job.applyUrl} target="_blank" rel="noreferrer">
                                                            {item.job.title}
                                                        </a>
                                                    </h3>
                                                    <span className={`digest-score score-${item.matchScore >= 80 ? 'high' : 'med'}`}>
                                                        {item.matchScore}% Match
                                                    </span>
                                                </div>
                                                <div className="digest-job-company">{item.job.company}</div>
                                                <div className="digest-job-meta">
                                                    <span><MapPin size={12} /> {item.job.location}</span>
                                                    <span><Briefcase size={12} /> {item.job.experience}</span>
                                                    <span><Clock size={12} /> {item.job.postedDaysAgo}d ago</span>
                                                </div>
                                            </div>
                                            <div className="digest-item-action">
                                                <a href={item.job.applyUrl} target="_blank" rel="noreferrer" className="digest-apply-link">
                                                    Apply &rarr;
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="digest-no-matches">
                                        <p>No high-quality matches found today. Check back tomorrow!</p>
                                    </div>
                                )}
                            </div>

                            {statusHistory.length > 0 && (
                                <div className="digest-section">
                                    <h2 className="digest-section-title">Recent Status Updates</h2>
                                    <div className="status-history-list">
                                        {statusHistory.slice(0, 5).map((item, idx) => (
                                            <div key={idx} className="status-history-item">
                                                <div className="status-dot" style={{ backgroundColor: getStatusColor(item.status) === 'green' ? '#22c55e' : getStatusColor(item.status) === 'red' ? '#ef4444' : '#3b82f6' }}></div>
                                                <div className="status-info">
                                                    <div className="status-job">{item.title} at {item.company}</div>
                                                    <div className="status-meta">
                                                        Marked as <strong>{getStatusLabel(item.status)}</strong> &bull; {new Date(item.date).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="digest-footer">
                                <p>This digest was generated based on your preferences.</p>
                                <p>Job Notification Tracker &copy; 2026</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PrimaryWorkspace>
    );
};
