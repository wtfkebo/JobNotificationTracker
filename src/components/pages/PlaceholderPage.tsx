import React from 'react';
import { PrimaryWorkspace } from '../layout/PrimaryWorkspace';
import { ContextProvider } from '../layout/ContextProvider';

interface PlaceholderPageProps {
    title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    return (
        <PrimaryWorkspace>
            <ContextProvider
                title={title}
                description="This section will be built in the next step."
            />
        </PrimaryWorkspace>
    );
};
