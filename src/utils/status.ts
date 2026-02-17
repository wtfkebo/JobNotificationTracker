export type JobStatus = 'not-applied' | 'applied' | 'rejected' | 'selected';

export interface StatusHistoryItem {
    jobId: string;
    status: JobStatus;
    date: string;
    title: string;
    company: string;
}

const STATUS_STORAGE_KEY = 'jobTrackerStatus';
const HISTORY_STORAGE_KEY = 'jobTrackerStatusHistory';

export const getJobStatus = (jobId: string): JobStatus => {
    const stored = localStorage.getItem(STATUS_STORAGE_KEY);
    if (stored) {
        const statusMap = JSON.parse(stored);
        return statusMap[jobId] || 'not-applied';
    }
    return 'not-applied';
};

export const getAllJobStatuses = (): Record<string, JobStatus> => {
    const stored = localStorage.getItem(STATUS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
};

export const getStatusHistory = (): StatusHistoryItem[] => {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const updateJobStatus = (
    jobId: string,
    status: JobStatus,
    title: string,
    company: string
) => {
    // Update current status map
    const currentStatuses = getAllJobStatuses();
    currentStatuses[jobId] = status;
    localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(currentStatuses));

    // Add to history
    const history = getStatusHistory();
    const newItem: StatusHistoryItem = {
        jobId,
        status,
        date: new Date().toISOString(),
        title,
        company
    };
    // Prepend new item
    const newHistory = [newItem, ...history].slice(0, 50); // Keep last 50
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
};

export const getStatusColor = (status: JobStatus): string => {
    switch (status) {
        case 'applied': return 'blue';
        case 'rejected': return 'red';
        case 'selected': return 'green';
        default: return 'neutral';
    }
};

export const getStatusLabel = (status: JobStatus): string => {
    switch (status) {
        case 'not-applied': return 'Not Applied';
        case 'applied': return 'Applied';
        case 'rejected': return 'Rejected';
        case 'selected': return 'Selected';
        default: return 'Unknown';
    }
};
