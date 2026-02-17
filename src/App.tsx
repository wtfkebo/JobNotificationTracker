
import { AppLayout } from './components/layout/AppLayout';
import { ContextProvider } from './components/layout/ContextProvider';
import { PrimaryWorkspace } from './components/layout/PrimaryWorkspace';
import { SecondaryPanel } from './components/layout/SecondaryPanel';
import { Card } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';

function App() {
  return (
    <AppLayout step={1} totalSteps={5} status="not-started">
      <PrimaryWorkspace>
        <ContextProvider
          title="Project Initialization"
          description="Define the core parameters of your application. This foundation will drive all subsequent build steps."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card title="Core Settings" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input label="Project Name" placeholder="e.g. KodNest Premium" />
              <Input label="Domain" placeholder="e.g. kodnest.com" />
              <Input label="Description" placeholder="Briefly describe your project..." />
            </div>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="ghost">Cancel</Button>
              <Button>Save Settings</Button>
            </div>
          </Card>

          <Card title="Configuration" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input label="API Key" placeholder="sk-..." type="password" />
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="secondary">Check Connection</Button>
              </div>
            </div>
          </Card>
        </div>
      </PrimaryWorkspace>

      <SecondaryPanel
        stepDescription="We are currently initializing the project structure. Review the settings on the left and click 'Build in Lovable' to proceed."
        prompt="Create a detailed project plan for a SaaS application with..."
      />
    </AppLayout>
  );
}

export default App;
