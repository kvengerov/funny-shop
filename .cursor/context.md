# Project Context
- **Architecture**: Feature-Sliced Design (FSD)
- **State Management**: Angular Signals
- **Styling**: Tailwind CSS v4
- **API Pattern**: Use `inject(HttpClient)` in services and `toSignal()` for data fetching.
- **Strictness**: No cross-slice imports within the same layer. Only imports from lower layers allowed.