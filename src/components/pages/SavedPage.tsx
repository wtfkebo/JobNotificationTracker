import React, { useState, useEffect } from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { jobs as jobData } from '../../data/jobs';
import type { Job } from '../../data/jobs';
import { JobCard } from '../jobs/JobCard';
import { JobModal } from '../jobs/JobModal';
import { Card } from '../ui/Card';
import { Bookmark } from 'lucide-react';
import './DashboardPage.css'; // Reusing empty state styles

export const SavedPage: React.FC = () => {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

    // Load saved jobs
    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            const ids = new Set(JSON.parse(saved) as string[]);
            setSavedJobIds(ids);
            const filteredJobs = jobData.filter(job => ids.has(job.id));
            setSavedJobs(filteredJobs);
        }
    }, []);

    const handleRemoveSaved = (jobId: string) => {
        const newSavedIds = new Set(savedJobIds);
        newSavedIds.delete(jobId);
        setSavedJobIds(newSavedIds);
        localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSavedIds)));

        // Update UI
        setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    };

    const handleViewJob = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedJob(null), 200);
    };

    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Saved Jobs"
                description="Your curated collection of opportunities."
            />

            <div className="dashboard-content">
                {savedJobs.length > 0 ? (
                    <div className="jobs-grid">
                        {savedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={true}
                                onView={handleViewJob}
                                onSave={handleRemoveSaved}
                            />
                        ))}
                    </div>
                ) : (
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
                )}
            </div>

            <JobModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </PrimaryWorkspace>
    );
};
