import React from 'react';
import type { Job } from '../../data/jobs';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPin, Briefcase, Clock, Bookmark } from 'lucide-react';
import './JobCard.css';

interface JobCardProps {
    job: Job;
    isSaved?: boolean;
    matchScore?: number;
    matchColor?: 'green' | 'amber' | 'neutral' | 'grey';
    onView: (job: Job) => void;
    onSave: (jobId: string) => void;
    status?: 'not-applied' | 'applied' | 'rejected' | 'selected';
    onStatusChange?: (jobId: string, status: 'not-applied' | 'applied' | 'rejected' | 'selected') => void;
}

export const JobCard: React.FC<JobCardProps> = ({
    job,
    isSaved = false,
    matchScore,
    matchColor = 'grey',
    onView,
    onSave,
    status = 'not-applied',
    onStatusChange
}) => {
    const handleApply = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(job.applyUrl, '_blank');
    };

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSave(job.id);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        if (onStatusChange) {
            onStatusChange(job.id, e.target.value as any);
        }
    };

    const getStatusClass = (s: string) => {
        switch (s) {
            case 'applied': return 'status-applied';
            case 'rejected': return 'status-rejected';
            case 'selected': return 'status-selected';
            default: return 'status-neutral';
        }
    };

    return (
        <div className="job-card-wrapper" onClick={() => onView(job)}>
            <Card hoverable className={`job-card ${getStatusClass(status)}`}>
                <div className="job-card-header">
                    <div>
                        <h3 className="job-title">{job.title}</h3>
                        <div className="job-company">{job.company}</div>
                    </div>
                    <div className="job-posted">
                        <Clock size={14} className="icon-subtle" />
                        <span>{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}</span>
                    </div>
                </div>

                {matchScore !== undefined && (
                    <div className={`match-badge match-badge--${matchColor}`}>
                        {matchScore}% Match
                    </div>
                )}

                <div className="job-meta">
                    <div className="meta-item">
                        <MapPin size={14} />
                        <span>{job.location} ({job.mode})</span>
                    </div>
                    <div className="meta-item">
                        <Briefcase size={14} />
                        <span>{job.experience}</span>
                    </div>
                    {job.salaryRange && (
                        <div className="meta-item salary-tag">
                            <span>{job.salaryRange}</span>
                        </div>
                    )}
                </div>

                <div className="job-footer">
                    <div className="job-source-badge">
                        {job.source}
                    </div>
                    <div className="job-actions">
                        <div className="status-selector-wrapper" onClick={e => e.stopPropagation()}>
                            <select
                                className={`status-select ${getStatusClass(status)}`}
                                value={status}
                                onChange={handleStatusChange}
                            >
                                <option value="not-applied">Not Applied</option>
                                <option value="applied">Applied</option>
                                <option value="rejected">Rejected</option>
                                <option value="selected">Selected</option>
                            </select>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleSave}
                            className={isSaved ? 'btn-saved' : ''}
                        >
                            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                        </Button>
                        <Button size="sm" onClick={handleApply}>
                            Apply
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
