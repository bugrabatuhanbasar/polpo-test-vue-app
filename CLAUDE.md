# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 test application that simulates authentication flow with cookies and external token mechanism. The app is a **frontend-only** application with client-side cookie management for testing cookie behavior and URL-based token redirection.

## Development Commands

### Start Development Environment
```bash
# Start frontend dev server
npm run dev
```

### Build and Preview
```bash
npm run build
npm run preview
```

### Package Management
```bash
npm install
```

## Architecture Overview

### Frontend (Vue 3 + Vite)
- **Router**: Vue Router with external token handling in route guards
- **State Management**: Pinia auth store for authentication state (client-side only)
- **Components**: LoginForm.vue, Dashboard.vue
- **Authentication Flow**: Supports both form login and external token via URL params
- **Cookie Management**: All cookie operations handled client-side via `document.cookie`

### Cookie Configuration
- **Name**: `app_session`
- **Settings**: Path=/, SameSite=Lax, max-age=86400 (24 hours)
- **Management**: Set and read via JavaScript `document.cookie` API
- **Visibility**: Fully readable in JavaScript for testing purposes

### External Token Flow
- URL format: `https://main.d6xh3r3brmj6.amplifyapp.com/?external_token=XYZ123`
- Router guard detects token parameter and processes authentication
- Token is stored as a cookie client-side
- Automatic redirect to dashboard after successful token processing

### Authentication Flow
1. **Form Login**: User enters credentials, app generates random session token, stores in cookie
2. **Token Login**: External token from URL parameter is stored directly as cookie
3. **Auth Check**: Router guard checks for `app_session` cookie on page load
4. **Logout**: Cookie is cleared by setting expiration date in the past

## Deployment

This application is deployed on AWS Amplify as a static site:
- **URL**: https://main.d6xh3r3brmj6.amplifyapp.com/
- **Type**: Static hosting (frontend only, no backend required)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Testing Notes

This is a **test-only setup** with security configurations that should never be used in production:
- No backend authentication - tokens are generated client-side
- Cookies are not HttpOnly to allow JavaScript access for testing
- Full cookie values are logged to console for debugging
- No HTTPS enforcement in local development
- No actual credential validation