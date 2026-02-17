import React, { useState, useEffect } from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';
import { FilterBar } from '../jobs/FilterBar';
import { JobCard } from '../jobs/JobCard';
import { JobModal } from '../jobs/JobModal';
import { jobs as jobData } from '../../data/jobs';
import type { Job } from '../../data/jobs';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

    // Load saved jobs from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobIds(new Set(JSON.parse(saved)));
        }
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

    return (
        <PrimaryWorkspace>
            <ContextProvider
                title="Dashboard"
                description="Your daily job matches."
            />

            <div className="dashboard-content">
                <FilterBar onSearch={() => { }} />

                <div className="jobs-grid">
                    {jobData.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobIds.has(job.id)}
                            onView={handleViewJob}
                            onSave={handleSaveJob}
                        />
                    ))}
                </div>
            </div>

            <JobModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </PrimaryWorkspace>
    );
};
