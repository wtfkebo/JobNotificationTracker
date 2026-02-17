import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Search, MapPin } from 'lucide-react';
import './FilterBar.css';

interface FilterBarProps {
    onSearch: (filters: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onSearch }) => {
    // Placeholder for filter state - in a real app this would be controlled
    return (
        <Card className="filter-bar-card" padding="md">
            <div className="filter-bar-container">
                <div className="filter-main">
                    <div className="filter-input-wrapper">
                        <Search size={18} className="filter-icon" />
                        <input type="text" placeholder="Job title, skills, or company" className="filter-input" />
                    </div>
                    <div className="filter-divider"></div>
                    <div className="filter-input-wrapper">
                        <MapPin size={18} className="filter-icon" />
                        <input type="text" placeholder="Location" className="filter-input" />
                    </div>
                    <Button onClick={() => onSearch({})}>Search Jobs</Button>
                </div>

                <div className="filter-advanced">
                    <div className="filter-select-group">
                        <select className="filter-select">
                            <option value="">Experience</option>
                            <option value="Fresher">Fresher (0)</option>
                            <option value="0-1">0-1 Years</option>
                            <option value="1-3">1-3 Years</option>
                            <option value="3-5">3-5 Years</option>
                            <option value="5+">5+ Years</option>
                        </select>

                        <select className="filter-select">
                            <option value="">Mode</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Onsite">Onsite</option>
                        </select>

                        <select className="filter-select">
                            <option value="">Source</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Naukri">Naukri</option>
                            <option value="Indeed">Indeed</option>
                        </select>
                    </div>

                    <div className="filter-sort">
                        <span className="sort-label">Sort by:</span>
                        <select className="sort-select">
                            <option value="latest">Latest</option>
                            <option value="salary">Salary</option>
                        </select>
                    </div>
                </div>
            </div>
        </Card>
    );
};
