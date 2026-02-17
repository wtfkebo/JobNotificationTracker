
import './SecondaryPanel.css';
import { Button } from '../ui/Button';
import { Copy, Check, AlertTriangle, Image as ImageIcon } from 'lucide-react';

interface SecondaryPanelProps {
    stepDescription?: string;
    prompt?: string;
}

export const SecondaryPanel: React.FC<SecondaryPanelProps> = ({
    stepDescription = "Review the current step and proceed.",
    prompt = "Build a calm, intentional design system.",
}) => {
    return (
        <div className="secondary-panel">
            <div className="panel-content">
                <h3 className="panel-title">Current Step</h3>
                <p className="panel-description">{stepDescription}</p>

                <div className="prompt-box">
                    <label className="prompt-label">Prompt</label>
                    <div className="prompt-content">
                        {prompt}
                    </div>
                    <Button variant="secondary" size="sm" fullWidth className="copy-btn">
                        <Copy size={14} style={{ marginRight: 8 }} /> Copy Prompt
                    </Button>
                </div>

                <div className="panel-actions">
                    <Button variant="primary" fullWidth>
                        Build in Lovable
                    </Button>

                    <div className="action-grid">
                        <Button variant="secondary" size="sm">
                            <Check size={14} style={{ marginRight: 6 }} /> It Worked
                        </Button>
                        <Button variant="secondary" size="sm">
                            <AlertTriangle size={14} style={{ marginRight: 6 }} /> Error
                        </Button>
                        <Button variant="secondary" size="sm">
                            <ImageIcon size={14} style={{ marginRight: 6 }} /> Add Screenshot
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
