import React, { useEffect } from 'react';
import type { Job } from '../../data/jobs'; // Use type-only import
import { Button } from '../ui/Button';
import { X, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import './JobModal.css';

interface JobModalProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    if (!isOpen || !job) return null;

    return (
        <div className="job-modal-overlay" onClick={onClose}>
            <div
                className="job-modal-content"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <h2 className="modal-title">{job.title}</h2>
                    <div className="modal-company">{job.company}</div>

                    <div className="modal-meta-row">
                        <div className="modal-meta-item">
                            <MapPin size={16} /> {job.location} ({job.mode})
                        </div>
                        <div className="modal-meta-item">
                            <Briefcase size={16} /> {job.experience}
                        </div>
                        <div className="modal-salary">{job.salaryRange}</div>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="modal-section">
                        <h3>Description</h3>
                        <p>{job.description}</p>
                    </div>

                    <div className="modal-section">
                        <h3>Skills</h3>
                        <div className="skills-list">
                            {job.skills.map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button onClick={() => window.open(job.applyUrl, '_blank')}>
                        Apply Now <ExternalLink size={16} style={{ marginLeft: 8 }} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
