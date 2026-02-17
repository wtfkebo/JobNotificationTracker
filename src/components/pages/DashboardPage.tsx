import React, { useState, useEffect, useMemo } from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { FilterBar } from '../jobs/FilterBar';
import { JobCard } from '../jobs/JobCard';
import { JobModal } from '../jobs/JobModal';
import { jobs as jobData } from '../../data/jobs';
import type { Job } from '../../data/jobs';
import {
    DEFAULT_PREFERENCES,
    calculateMatchScore,
    getMatchColor
} from '../../utils/matching';
import type { Preferences } from '../../utils/matching';
import { Card } from '../ui/Card';
import { Zap } from 'lucide-react';
import {
    getAllJobStatuses,
    updateJobStatus,
    getStatusLabel
} from '../../utils/status';
import type { JobStatus } from '../../utils/status';
import { Toast } from '../ui/Toast';
import './DashboardPage.css';

interface ScoredJob extends Job {
    matchScore: number;
    matchColor: 'green' | 'amber' | 'neutral' | 'grey';
}

export const DashboardPage: React.FC = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
    const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFERENCES);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);

    // Status State
    const [jobStatuses, setJobStatuses] = useState<Record<string, JobStatus>>({});
    const [toast, setToast] = useState({ message: '', visible: false });

    // Filter states
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        experience: '',
        mode: '',
        source: '',
        status: '',
        sort: 'latest' // 'latest' | 'salary' | 'match'
    });

    // Load saved jobs & preferences
    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobIds(new Set(JSON.parse(saved) as string[]));
        }

        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPrefs(JSON.parse(savedPrefs));
        }

        // Load statuses
        const statuses = getAllJobStatuses();
        setJobStatuses(statuses);
    }, []);

    const handleSaveJob = (jobId: string) => {
        const newSaved = new Set(savedJobIds);
        if (newSaved.has(jobId)) {
            newSaved.delete(jobId);
        } else {
            newSaved.add(jobId);
        }
        setSavedJobIds(newSaved);
        localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSaved)));
    };

    const handleViewJob = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedJob(null), 200);
    };

    const handleSearch = (newFilters: any) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
        const job = jobData.find(j => j.id === jobId);
        if (job) {
            updateJobStatus(jobId, newStatus, job.title, job.company);
            setJobStatuses(prev => ({ ...prev, [jobId]: newStatus }));

            // Show toast
            if (newStatus !== 'not-applied') {
                setToast({
                    message: `Status updated: ${getStatusLabel(newStatus)}`,
                    visible: true
                });
            }
        }
    };

    // Compute matches and filter
    const displayedJobs = useMemo(() => {
        // 1. Score all jobs
        let scoredJobs: ScoredJob[] = jobData.map(job => {
            const score = calculateMatchScore(job, prefs);
            return {
                ...job,
                matchScore: score,
                matchColor: getMatchColor(score)
            };
        });

        // 2. Filter by "Show only matches" toggle
        if (showOnlyMatches) {
            scoredJobs = scoredJobs.filter(job => job.matchScore >= prefs.minMatchScore);
        }

        // 3. Apply standard filters (AND logic)
        scoredJobs = scoredJobs.filter(job => {
            if (filters.keyword) {
                const k = filters.keyword.toLowerCase();
                const matchesKeyword =
                    job.title.toLowerCase().includes(k) ||
                    job.company.toLowerCase().includes(k) ||
                    job.skills.some(s => s.toLowerCase().includes(k));
                if (!matchesKeyword) return false;
            }

            if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }

            if (filters.experience && job.experience !== filters.experience) return false;
            if (filters.mode && job.mode !== filters.mode) return false;
            if (filters.source && job.source !== filters.source) return false;

            if (filters.source && job.source !== filters.source) return false;

            // Status Filter
            if (filters.status) {
                const currentStatus = jobStatuses[job.id] || 'not-applied';
                if (currentStatus !== filters.status) return false;
            }

            return true;
        });

        // 4. Sort
        scoredJobs.sort((a, b) => {
            if (filters.sort === 'match') {
                return b.matchScore - a.matchScore;
            } else if (filters.sort === 'salary') {
                // Rough salary sort (parsing string ranges is complex, doing simple length/char compare for now or first digit)
                // Better implementation: extract max LPA
                const getSalary = (s: string) => {
                    const match = s.match(/(\d+)/);
                    return match ? parseInt(match[0]) : 0;
                };
                return getSalary(b.salaryRange) - getSalary(a.salaryRange);
            } else {
                // Latest (default)
                return a.postedDaysAgo - b.postedDaysAgo;
            }
        });

        return scoredJobs;
    }, [jobData, prefs, showOnlyMatches, filters]);

    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Dashboard"
                description="Your daily job matches."
            />

            <div className="dashboard-content">
                <div className="dashboard-controls">
                    <FilterBar onSearch={handleSearch} />

                    <div className="match-toggle-wrapper">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showOnlyMatches}
                                onChange={(e) => setShowOnlyMatches(e.target.checked)}
                            />
                            <span className="toggle-text">
                                <Zap size={16} fill={showOnlyMatches ? "currentColor" : "none"} />
                                Show only matches &gt; {prefs.minMatchScore}%
                            </span>
                        </label>
                    </div>
                </div>

                {displayedJobs.length > 0 ? (
                    <div className="jobs-grid">
                        {displayedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={savedJobIds.has(job.id)}
                                matchScore={job.matchScore}
                                matchColor={job.matchColor}
                                onView={handleViewJob}
                                onSave={handleSaveJob}
                                status={jobStatuses[job.id] || 'not-applied'}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="dashboard-empty-state">
                        <Card className="empty-card" padding="lg">
                            <div className="empty-content">
                                <h3 className="empty-title">No jobs found</h3>
                                <p className="empty-description">
                                    Try adjusting your filters or lowering your match threshold.
                                </p>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            <JobModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={closeModal}
            />

            <Toast
                message={toast.message}
                isVisible={toast.visible}
                onClose={() => setToast(prev => ({ ...prev, visible: false }))}
            />
        </PrimaryWorkspace>
    );
};
