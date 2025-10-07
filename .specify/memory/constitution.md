<!--
Sync Impact Report
==================
Version: 0.0.0 → 1.0.0
Rationale: Initial constitution establishment for FinStrats.y project

Modified Principles: N/A (initial creation)
Added Sections:
  - Core Principles (5 principles)
  - Integration Standards
  - Development Workflow
  - Governance

Templates Status:
  ✅ spec-template.md - aligned with constitution principles
  ✅ plan-template.md - includes Constitution Check section
  ✅ tasks-template.md - aligned with TDD and testing requirements

Follow-up TODOs: None
-->

# FinStrats.y Constitution

## Core Principles

### I. Service-Oriented Architecture
The application MUST maintain a clear service layer pattern with three core services (YNAB, N8N, Enhanced AI). Each service:
- MUST be implemented as a singleton with a default exported instance
- MUST provide graceful degradation via mock data when API keys are unavailable
- MUST expose its types alongside implementation in the same service file
- MUST NOT leak implementation details to consuming components

**Rationale**: This pattern enables development without full infrastructure, maintains clear separation of concerns, and provides consistent interfaces for feature components. The mock data fallback is critical for developer productivity and testing.

### II. Type Safety & Currency Handling (NON-NEGOTIABLE)
All YNAB monetary values MUST be handled as milliunits (1 dollar = 1000 milliunits):
- MUST use `YNABService.convertMilliunitsToCurrency()` when displaying amounts
- MUST use `YNABService.convertCurrencyToMilliunits()` when sending to YNAB API
- MUST NOT perform direct mathematical operations on currency without conversion
- Type definitions MUST mirror official YNAB SDK structure with camelCase naming

**Rationale**: YNAB API uses milliunits to avoid floating-point precision issues. Direct conversion violations lead to financial calculation errors. This is non-negotiable as it directly impacts data integrity.

### III. Component Organization by Feature
Components MUST be organized by feature domain, not technical type:
- Feature components live in `components/features/{domain}/`
- Reusable UI primitives live in `components/ui/`
- Page components in `app/{domain}/` MUST use only feature components and UI primitives
- MUST NOT create mixed-concern components (e.g., a component that handles both debt and scenarios)

**Rationale**: Feature-based organization scales better, improves discoverability, and aligns with the app's domain structure. This prevents the common pitfall of organizing by technical role (all buttons together, all forms together).

### IV. Environment-Driven Development
The application MUST function in three modes without code changes:
1. **Full Mode**: All API keys configured, live data from YNAB/N8N/AI services
2. **Partial Mode**: Some API keys configured (e.g., YNAB only), others use mocks
3. **Mock Mode**: No API keys configured, all services return mock data

Services MUST:
- Check for API keys in constructors and set mode accordingly
- Log warnings when falling back to mock mode (development only)
- Provide realistic mock data that matches production data structures
- MUST NOT throw errors or fail when API keys are missing

**Rationale**: Enables rapid development without external dependencies, allows partial integration testing, and provides demo capabilities. This significantly reduces onboarding friction for new developers.

### V. N8N Workflow Integration
N8N workflows MUST be treated as first-class automation primitives:
- Predefined templates MUST be maintained in `WORKFLOW_TEMPLATES` constant
- Workflow creation MUST use template-based approach, not manual node building
- Each automation feature MUST map to a documented N8N workflow template
- Webhook URLs MUST follow pattern: `{N8N_WEBHOOK_URL}/{workflow_id}`

**Rationale**: N8N is a core differentiator for this application. Standardizing workflow patterns ensures consistency, maintainability, and allows non-developers to understand automation logic.

## Integration Standards

### YNAB SDK Integration
- MUST use official `ynab` package, not custom API clients
- MUST handle `serverKnowledge` for efficient delta syncing
- MUST respect YNAB rate limits (200 requests per hour per token)
- Error handling MUST gracefully fall back to cached data when available
- Transaction mutations MUST include proper `cleared` enum values

### External Service Resilience
- All external API calls MUST have timeout configuration
- Network errors MUST result in mock data fallback, not application crashes
- User-visible errors MUST be actionable (e.g., "Check your YNAB API key in settings")
- Services MUST NOT retry failed requests without exponential backoff

### Type Re-exports
- `types/index.ts` MUST re-export all service types for convenience
- Service files remain the source of truth for type definitions
- Legacy types in `types/index.ts` maintained for backward compatibility only
- New code MUST NOT use legacy types when service types are available

## Development Workflow

### Adding New Features
1. Identify the feature domain (automation, debt, scenarios, etc.)
2. Create feature components in appropriate `components/features/{domain}/` directory
3. Create or update page in `app/{domain}/`
4. If new service integration needed, follow Service-Oriented Architecture principle
5. Update `CLAUDE.md` if architectural patterns change

### Adding N8N Automation
1. Define workflow template in `WORKFLOW_TEMPLATES` in `services/n8n.ts`
2. Document trigger type, schedule/webhook config, and purpose
3. Create UI component in `components/features/automation/`
4. Use `n8nService.createWorkflow()` with template configuration

### Working with YNAB Data
1. Always use service singletons: `ynabService`, `n8nService`, `enhancedAIService`
2. Convert milliunits at display boundaries (components), not in services
3. Use `formatCurrency()` helper for consistent currency display
4. Filter deleted/hidden entities in UI layer, not service layer

### Testing Requirements
- Service mock data MUST be maintained alongside implementation
- Mock data MUST reflect realistic production scenarios
- Components MUST be testable without API keys configured
- Integration tests MUST work in Mock Mode

## Governance

### Constitution Authority
This constitution supersedes all other development practices and conventions. When conflicts arise:
1. Constitution principles take precedence
2. `CLAUDE.md` provides implementation guidance within constitutional bounds
3. Template files must align with constitutional requirements
4. Non-constitutional guidance can be overridden with justification

### Amendment Process
1. Proposed changes MUST be documented with rationale
2. Breaking changes require MAJOR version increment
3. New principles/sections require MINOR version increment
4. Clarifications/refinements require PATCH version increment
5. All template files MUST be updated to reflect constitutional changes
6. Migration plan required for changes affecting existing code

### Compliance Review
- All pull requests MUST verify compliance with Core Principles
- Constitution violations MUST be justified in complexity tracking
- Service architecture changes MUST preserve mock data fallback capability
- Type system changes MUST maintain backward compatibility unless MAJOR version bump

### Runtime Guidance
For daily development guidance and command reference, consult `CLAUDE.md` in the repository root. The constitution defines "what must be," while `CLAUDE.md` explains "how to do it."

**Version**: 1.0.0 | **Ratified**: 2025-10-06 | **Last Amended**: 2025-10-06
