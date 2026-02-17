import React, { useState } from 'react';
import { Square, CheckSquare } from 'lucide-react';
import classNames from 'classnames';
import './ProofFooter.css';

interface ProofItem {
    id: string;
    label: string;
    checked: boolean;
}

export const ProofFooter: React.FC = () => {
    const [items, setItems] = useState<ProofItem[]>([
        { id: '1', label: 'UI Built', checked: false },
        { id: '2', label: 'Logic Working', checked: false },
        { id: '3', label: 'Test Passed', checked: false },
        { id: '4', label: 'Deployed', checked: false }, // "Deployed" isn't strictly requested to be last but is fine
    ]);

    const toggleItem = (id: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    return (
        <div className="proof-footer">
            <div className="proof-container">
                {items.map(item => (
                    <div
                        key={item.id}
                        className={classNames('proof-item', { 'proof-item--checked': item.checked })}
                        onClick={() => toggleItem(item.id)}
                    >
                        {item.checked ? (
                            <CheckSquare size={18} className="proof-icon" />
                        ) : (
                            <Square size={18} className="proof-icon" />
                        )}
                        <span className="proof-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
