# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 test application that simulates authentication flow with cookies and external token mechanism. The app includes a frontend (Vue 3 + Vite) and a mock Express.js backend for testing cookie behavior and URL-based token redirection.

## Development Commands

### Start Development Environment
```bash
# Start backend server (Terminal 1)
npm run dev:backend

# Start frontend dev server (Terminal 2)
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
- **State Management**: Pinia auth store for authentication state
- **HTTP Client**: Axios configured with `withCredentials: true`
- **Components**: LoginForm.vue, Dashboard.vue
- **Authentication Flow**: Supports both form login and external token via URL params

### Backend (Express.js Mock)
- **Port**: 3001 (proxied through Vite dev server)
- **CORS**: Configured for localhost:5173 with credentials
- **Logging**: Access middleware logs all requests with cookie information
- **Endpoints**: `/api/auth/login`, `/api/auth/token-login`, `/api/auth/status`

### Cookie Configuration
- **Name**: `app_session`
- **Settings**: Path=/, SameSite=Lax, non-HttpOnly (for testing)
- **Visibility**: Readable in JavaScript for testing purposes

### External Token Flow
- URL format: `http://localhost:5173?external_token=XYZ123`
- Router guard detects token parameter and processes authentication
- Automatic redirect to dashboard after successful token processing

## Testing Notes

This is a **test-only setup** with security configurations that should never be used in production:
- Cookies are not HttpOnly to allow JavaScript access for testing
- Full cookie values are logged to console for debugging
- No HTTPS enforcement