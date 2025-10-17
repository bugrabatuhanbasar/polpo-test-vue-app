# Polpo Test Vue App

A Vue 3 application that simulates authentication flow with cookies and external token mechanism for testing purposes.

## Features

- Simple login system with email/password
- Cookie-based session management (`app_session` cookie)
- External token authentication via URL parameters
- Express.js mock backend with access logging
- Cookie visibility testing in browser

## Installation

```bash
npm install
```

## Running the Application

### Start the Backend Server (Terminal 1)
```bash
npm run dev:backend
```
The backend server will run on http://localhost:3001

### Start the Frontend Development Server (Terminal 2)
```bash
npm run dev
```
The frontend will run on http://localhost:5173

## Testing Authentication

### 1. Regular Login
1. Go to http://localhost:5173
2. Enter any email and password
3. Click "Login"
4. Check the server logs to see cookie information

### 2. External Token Authentication
1. Visit: http://localhost:5173?external_token=XYZ123
2. The app will automatically process the token and redirect to dashboard
3. Check browser cookies and server logs

### 3. Cookie Inspection
- Open browser dev tools (F12)
- Go to Application/Storage > Cookies
- Look for `app_session` cookie
- Note: Cookie is NOT HttpOnly for testing purposes

## Server Logs

The backend logs all requests with cookie information:
- **Full cookie logs**: Shows complete cookie values (test only)
- **Masked logs**: Shows first 4 characters + *** for security demo

## API Endpoints

- `POST /api/auth/login` - Standard email/password login
- `POST /api/auth/token-login` - External token authentication
- `GET /api/auth/status` - Check authentication status

## Security Notes

⚠️ **TEST ENVIRONMENT ONLY**
- Cookies are not HttpOnly (for testing)
- Full cookie values are logged (for testing)
- No HTTPS enforcement
- Use only in isolated test environment

## Project Structure

```
src/
├── components/
│   └── LoginForm.vue
├── pages/
│   └── Dashboard.vue
├── router/
│   └── index.js
├── store/
│   └── auth.js
└── main.js
server/
└── index.js
```