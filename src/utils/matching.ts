import type { Job } from '../data/jobs';

export interface Preferences {
    roleKeywords: string[];
    preferredLocations: string[];
    preferredMode: ('Remote' | 'Hybrid' | 'Onsite')[];
    experienceLevel: string;
    skills: string[];
    minMatchScore: number;
}

export const DEFAULT_PREFERENCES: Preferences = {
    roleKeywords: [],
    preferredLocations: [],
    preferredMode: [],
    experienceLevel: '',
    skills: [],
    minMatchScore: 40,
};

export const calculateMatchScore = (job: Job, prefs: Preferences): number => {
    let score = 0;

    // Rule 1: +25 if any roleKeyword appears in job.title (case-insensitive)
    if (prefs.roleKeywords.length > 0) {
        const titleLower = job.title.toLowerCase();
        const hasRoleMatch = prefs.roleKeywords.some(keyword =>
            titleLower.includes(keyword.toLowerCase().trim())
        );
        if (hasRoleMatch) score += 25;
    }

    // Rule 2: +15 if any roleKeyword appears in job.description
    if (prefs.roleKeywords.length > 0) {
        const descLower = job.description.toLowerCase();
        const hasDescMatch = prefs.roleKeywords.some(keyword =>
            descLower.includes(keyword.toLowerCase().trim())
        );
        if (hasDescMatch) score += 15;
    }

    // Rule 3: +15 if job.location matches preferredLocations
    if (prefs.preferredLocations.length > 0) {
        // Check for exact match or if preferred location contains job location (e.g. "Bangalore" matches "Bangalore")
        // Or simpler: check if job.location is in the list
        const isLocationMatch = prefs.preferredLocations.some(loc =>
            job.location.toLowerCase() === loc.toLowerCase() ||
            job.location.toLowerCase().includes(loc.toLowerCase())
        );
        if (isLocationMatch) score += 15;
    }

    // Rule 4: +10 if job.mode matches preferredMode
    if (prefs.preferredMode.length > 0) {
        if (prefs.preferredMode.includes(job.mode)) {
            score += 10;
        }
    }

    // Rule 5: +10 if job.experience matches experienceLevel
    if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
        score += 10;
    }

    // Rule 6: +15 if overlap between job.skills and user.skills (any match)
    if (prefs.skills.length > 0 && job.skills.length > 0) {
        const hasSkillMatch = job.skills.some(jobSkill =>
            prefs.skills.some(userSkill =>
                jobSkill.toLowerCase() === userSkill.toLowerCase()
            )
        );
        if (hasSkillMatch) score += 15;
    }

    // Rule 7: +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // Rule 8: +5 if source is LinkedIn
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap score at 100
    return Math.min(score, 100);
};

export const getMatchColor = (score: number): 'green' | 'amber' | 'neutral' | 'grey' => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'amber';
    if (score >= 40) return 'neutral';
    return 'grey';
};
