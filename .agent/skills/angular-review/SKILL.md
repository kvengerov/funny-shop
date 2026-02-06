---
name: angular-review
description: Reviews Angular 21+ and TypeScript code focusing on Signals, Zoneless reactivity, and Signal-based routing.
---

## Critical Rules for Angular 21+
1. **Zoneless by Default**: Never use `NgZone`. Ensure the application/component is compatible with `provideExperimentalZonelessChangeDetection()`.
2. **Signal-Everything**:
   - Use `signal()`, `computed()`, and `effect()`.
   - Prefer Signal-based inputs: `input()`, `input.required()`.
   - Use Signal-based queries: `viewChild()`, `contentChild()`.
   - Outputs should use `output()`.
3. **Control Flow**: Strictly use `@if`, `@for`, `@switch`. No `*ngIf` or `*ngFor`.
4. **Lifecycle**: Use `afterRender` and `afterNextRender` instead of `ngAfterViewInit` where appropriate.
5. **Typescript**: Strict mode is mandatory. Use `inject()` instead of constructor injection.

## Review Checklist

### 1. Reactivity (Signals)
- [ ] Is `ChangeDetectionStrategy.OnPush` used? (Though in Zoneless it's less critical, it's good practice).
- [ ] Are inputs defined via `input()`?.
- [ ] Are there any manual `markForCheck()` or `detectChanges()`? (Replace with Signal updates).
- [ ] Are RxJS observables converted to signals using `toSignal()` for template usage?.

### 2. Template Performance
- [ ] Is `@for` using a proper `track` expression?.
- [ ] Are there heavy computations in the template? (Move to `computed()`).
- [ ] Is the new control flow syntax used correctly?.

### 3. Dependency Injection
- [ ] Is `inject()` used at the field level?.
- [ ] Are services provided in `'root'` unless a specific scope is needed?.

### 4. RxJS Usage
- [ ] RxJS should be used ONLY for asynchronous streams (HTTP, WebSockets).
- [ ] State management should be Signal-based, not BehaviorSubject-based.

### 5. Routing (New for Angular 21)
- [ ] Are route parameters accessed via Signal-based `input()`? (Using `withComponentInputBinding()`).
- [ ] Is `provideRouter` used with modern features like `withViewTransitions()`?

## Examples

### Modern Component Pattern
```typescript
@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: `
    @if (user(); as u) {
      <div>{{ u.name }}</div>
    } @else {
      <p>Loading...</p>
    }
  `
})
export class UserProfileComponent {
  // Inputs from Route or Parent
  userId = input.required<string>(); //
  
  // Services
  private userService = inject(UserService); //
  
  // State
  user = toSignal(
    toObservable(this.userId).pipe(
      switchMap(id => this.userService.getById(id))
    )
  ); //
}