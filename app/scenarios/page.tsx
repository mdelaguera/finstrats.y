import { ScenarioCards } from "@/components/features/scenarios/scenario-cards"
import { ScenarioConfigurationPanel } from "@/components/features/scenarios/scenario-config-panel"
import { ResultsVisualization } from "@/components/features/scenarios/results-visualization"

export default function ScenariosPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <h1 className="text-3xl font-bold mb-6">Scenario Modeling</h1>

      <ScenarioCards />
      <ScenarioConfigurationPanel />
      <ResultsVisualization />
    </div>
  )
}
