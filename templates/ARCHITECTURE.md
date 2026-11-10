# Codebase architecture

Apply these principles in proportion to the project and the change. Preserve established conventions where they already meet the same goals.

## Architecture & Project Structure

1. Follow modular architecture: Divide the application into independent, business-focused modules with clear responsibilities.
2. Prefer feature-based organization: Group files by feature (auth, users, projects, payments) rather than placing every controller, service, and model in global folders.
3. Maintain separation of concerns: API handling, business logic, database operations, and external integrations must have distinct responsibilities.
4. Enforce dependency direction: High-level business logic must not depend directly on frameworks, databases, or external services.
5. Prefer composition over inheritance: Combine small, reusable components instead of building deep inheritance hierarchies.
6. Avoid premature microservices: Start with a well-structured modular monolith unless independent deployment or scaling is genuinely needed.
7. Keep modules loosely coupled and highly cohesive: Changes within one module should have minimal impact on unrelated modules.

## Low-Level Design (LLD) & SOLID Principles

8. Single Responsibility Principle (SRP): Each class, function, or module should have one clearly defined responsibility.
9. Open/Closed Principle (OCP): Design components to support new behavior with minimal modification to existing, stable logic.
10. Liskov Substitution Principle (LSP): Implementations must honor the behavioral contracts of the abstractions they replace.
11. Interface Segregation Principle (ISP): Prefer small, focused interfaces over large interfaces containing unrelated methods.
12. Dependency Inversion Principle (DIP): Business logic should depend on abstractions where interchangeable implementations or isolation provide real value.
13. Encapsulation: Keep internal state and implementation details private. Expose only necessary operations.
14. DRY (Don't Repeat Yourself): Extract duplicated business rules, but avoid abstracting unrelated code merely because it looks similar.
15. KISS (Keep It Simple): Prefer straightforward, understandable solutions over unnecessarily sophisticated designs.

16. YAGNI (You Aren't Gonna Need It): Do not implement hypothetical extensibility or speculative features.
## Design Patterns & Abstractions

17. Use design patterns only when justified: Apply Factory, Strategy, Adapter, Observer, Repository, or similar patterns when they solve an identifiable design problem.
18. Use dependency injection: Supply dependencies explicitly rather than creating them throughout business logic.
19. Use repositories selectively: Introduce repository abstractions for meaningful persistence boundaries, not automatically for every database table.
20. Avoid god classes and god services: Split components that manage several unrelated responsibilities.
21. Avoid unnecessary abstraction: Do not create interfaces, factories, or wrappers that provide no practical benefit.
22. Design for change: Isolate parts likely to change, particularly external APIs, storage mechanisms, and provider-specific implementations.

## API & Business Logic Design

23. Keep controllers and routes thin: They should handle request validation, authentication context, orchestration, and response mapping—not core business rules.
24. Keep business logic framework-independent: Core rules should be testable without starting an HTTP server.
25. Define clear contracts: Use explicit request/response schemas, typed interfaces, and predictable error structures.
26. Validate at system boundaries: Validate external inputs before passing them into trusted application logic.
27. Use consistent error handling: Distinguish validation, authentication, authorization, business, and infrastructure failures.
28. Separate authentication from authorization: Being logged in must not automatically grant permission to access a resource.
29. Avoid hidden side effects: Functions should clearly communicate when they mutate state, update data, or interact with external systems.

## Database & Data Access

30. Centralize database access within appropriate module boundaries: Avoid scattering raw database queries across controllers and unrelated services.
31. Use transactions for atomic operations: Related database updates should either succeed together or fail together.
32. Prevent N+1 queries: Design efficient data retrieval and fetch only the data required.
33. Manage schema changes through migrations: Never rely on undocumented manual production database modifications.
34. Enforce data integrity: Use appropriate constraints, indexes, unique keys, and foreign keys.
35. Design for concurrency: Handle duplicate requests, race conditions, retries, and idempotency where relevant.

## Code Quality & Maintainability

36. Use descriptive naming: Functions, variables, classes, and modules should communicate their intent without requiring excessive comments.
37. Write small, focused functions: A function should perform one coherent operation.
38. Maintain strict type safety: Avoid any, unsafe casting, and ambiguous types in TypeScript.
39. Avoid magic values: Extract meaningful constants and centralize configuration.
40. Prefer explicitness over cleverness: Code should be understandable to another developer without extensive investigation.
41. Keep comments meaningful: Explain architectural decisions and non-obvious reasoning instead of restating the code.
42. Do not leave dead code: Remove unused functions, obsolete implementations, and unnecessary dependencies.
43. Use consistent formatting and linting: Enforce project-wide standards automatically.
44. Avoid circular dependencies: Modules should have a clear dependency structure.

## Testing, Security & Reliability

45. Design for testability: Core business logic should be independently testable with controlled dependencies.
46. Maintain a balanced testing strategy: Use unit tests for business rules, integration tests for database/API interactions, and end-to-end tests for critical flows.
47. Test edge cases and failure paths: Cover invalid inputs, missing resources, authorization failures, and dependency failures.
48. Never hardcode secrets: Manage credentials and environment-specific configuration securely.
49. Implement consistent observability: Use structured logging, request correlation IDs, metrics, and tracing where appropriate.
50. Handle external failures gracefully: Use explicit timeouts, bounded retries, and appropriate fallback behavior.
51. Secure every boundary: Validate authorization, enforce least privilege, protect sensitive data, and avoid exposing internal errors to clients.

## Development Workflow & AI Agent Rules

52. Understand existing architecture before modifying code: Inspect neighboring modules and established conventions.
53. Plan changes before implementation: Identify affected modules, dependencies, data contracts, and test requirements.
54. Reuse existing components: Do not create duplicate utilities, services, or abstractions.
55. Prefer minimal, focused changes: Avoid unrelated refactoring while implementing a feature.
56. Preserve backward compatibility: Do not break existing contracts without an explicit migration plan.
57. Use test-driven development where practical: Define expected behavior and failure cases before or alongside implementation.
58. Document important decisions: Maintain concise architecture decision records (ADRs) for significant tradeoffs.
59. Review code against architecture rules: Check responsibilities, dependencies, duplication, error handling, and tests before merging.
60. Never overengineer: The smallest design that correctly satisfies current requirements and supports foreseeable changes is preferable to an elaborate architecture.
