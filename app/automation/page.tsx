import { AutoCategorizationPanel } from "@/components/features/automation/auto-categorization-panel"
import { SmartAlertsConfiguration } from "@/components/features/automation/smart-alerts-config"
import { WebhookManagement } from "@/components/features/automation/webhook-management"

export default function AutomationPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <h1 className="text-3xl font-bold mb-6">AI Automation Hub</h1>

      <AutoCategorizationPanel />
      <SmartAlertsConfiguration />
      <WebhookManagement />
    </div>
  )
}
