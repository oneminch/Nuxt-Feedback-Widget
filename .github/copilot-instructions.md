# AI Agent Instructions for nuxt-feedback-widget

- Don't rewrite lines of code if there is no difference. I'm only interested in changes only.

## Project Overview

This is a Nuxt module that provides a customizable feedback widget with multiple submission backends. The widget supports email (via Resend), GitHub Issues, or custom endpoints for feedback collection.

## Key Architecture Patterns

### Module Structure

- Entry point: `src/module.ts` - Defines module options and registers components
- Runtime components in `src/runtime/`:
  - `components/` - Vue components including the main widget
  - `server/api/feedback/` - Backend handlers for different submission methods
  - `composables/` - Composable for interacting with widget

### Component Architecture

- The UI is built using [Tailwind CSS v4](https://tailwindcss.com/docs/upgrade-guide) and [Shadcn-Vue](https://www.shadcn-vue.com/docs/introduction.html).
- Main component: `FeedbackWidget.vue` uses dynamic components for responsive UI
- Adaptive Dialog/Drawer pattern based on screen size:

```vue
const Modal = computed(() => ({ Root: isDesktop.value ? Dialog : Drawer, // ...
other components }));
```

### State Management

- Global widget state managed via `useFeedbackWidget` composable
- Feedback submission state handled locally in components

## Critical Workflows

### Development

```bash
npm install          # Install dependencies
npm run dev:prepare # Generate type stubs
npm run dev         # Start playground for testing
```

### Adding New Features

1. Update types in `src/types.ts`
2. Implement UI changes in `src/runtime/components/`
3. Add server handlers in `src/runtime/server/api/feedback/`
4. Update module options in `src/module.ts` if needed

## Project Conventions

### Configuration

- Secrets (API keys, tokens) go in root `runtimeConfig`
- Module options are exposed to the runtime by modifying `runtimeConfig.public.feedbackWidget`
- Component props follow `FeedbackUIProps` interface

### Import Conventions

- Use `#imports` for Nuxt auto-imports
- Internal imports use relative paths
- UI components from `./ui/` follow shadcn-vue patterns

### Error Handling

- Server errors should be logged but not exposed to clients
- User-facing errors should be friendly and actionable
- Example from `email.post.ts`:

```typescript
logger.error("Missing email environment variables");
throw createError({
  statusCode: 500,
  message: "A server configuration error occurred",
});
```

## Integration Points

### Submission Methods

- Email: Requires Resend API setup
- GitHub: Needs repo access token along with repo name and owner
- Custom: Endpoint doesn't need to return anything

### CSS/Styling

- Uses [Tailwind CSS v4 (not v3)](https://tailwindcss.com/docs/upgrade-guide) with [shadcn-vue](https://www.shadcn-vue.com/docs/introduction.html) components
- Dark mode via `.dark` class utilities
