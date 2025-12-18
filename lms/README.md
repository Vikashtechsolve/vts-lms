# VTS LMS Frontend

React + Vite application for VTS Learning Management System.

## Environment Variables

This application uses environment variables for all configuration. Copy `.env.example` to `.env` and configure the following variables:

### API Configuration
- `VITE_API_URL` - Backend API base URL (default: `http://localhost:8000`)

### Razorpay Payment Gateway
- `VITE_RAZORPAY_KEY_ID` - Your Razorpay key ID
- `VITE_RAZORPAY_CHECKOUT_SCRIPT_URL` - Razorpay checkout script URL (default: `https://checkout.razorpay.com/v1/checkout.js`)

### Application Configuration
- `VITE_APP_NAME` - Application name (default: `VTS LMS`)
- `VITE_APP_DESCRIPTION` - Payment description (default: `Subscription Payment`)
- `VITE_APP_THEME_COLOR` - Theme color for payment gateway (default: `#ED0331`)

### Payment Configuration
- `VITE_DEFAULT_CURRENCY` - Default currency code (default: `INR`)
- `VITE_PAYMENT_GATEWAY_NAME` - Payment gateway display name (default: `VTS LMS`)

### UI Configuration
- `VITE_SUCCESS_MESSAGE_TIMEOUT` - Success message display timeout in ms (default: `3000`)
- `VITE_LOADING_MESSAGE` - Loading message text (default: `Loading...`)

### Error Messages
- `VITE_ERROR_BACKEND_CONNECTION` - Backend connection error message
- `VITE_ERROR_PAYMENT_FAILED` - Payment failed error message
- `VITE_ERROR_PAYMENT_VERIFICATION_FAILED` - Payment verification failed error message

### Temporary User Configuration
- `VITE_TEMP_PASSWORD_PREFIX` - Temporary password prefix for registration (default: `Temp123!@#`)

### Token Storage Keys
- `VITE_TOKEN_STORAGE_ACCESS_KEY` - Access token storage key (default: `accessToken`)
- `VITE_TOKEN_STORAGE_REFRESH_KEY` - Refresh token storage key (default: `refreshToken`)
- `VITE_TOKEN_STORAGE_USER_KEY` - User data storage key (default: `user`)

### Razorpay Payment Options
- `VITE_RAZORPAY_PREFILL_NAME` - Default prefill name for payment form
- `VITE_RAZORPAY_PREFILL_EMAIL` - Default prefill email for payment form
- `VITE_RAZORPAY_PREFILL_CONTACT` - Default prefill contact for payment form

### Development Configuration
- `VITE_DEV_MODE` - Enable development mode (default: `true`)
- `VITE_LOG_API_URL` - Log API URL in console (default: `true`)

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your configuration values

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Deployment

### Important: Environment Variables at Build Time

**Vite embeds environment variables at BUILD TIME, not runtime.** This means:

- Environment variables must be set **before** running `npm run build`
- The built files will contain the environment variable values
- You cannot change environment variables after building without rebuilding

### Setting Environment Variables for Deployment

#### Option 1: Using .env file (Local Build)
1. Create `.env` file with your production values
2. Run `npm run build`
3. Deploy the `dist` folder

#### Option 2: Platform Environment Variables (Recommended for CI/CD)

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add all `VITE_*` variables
3. Redeploy (variables are injected at build time)

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add all `VITE_*` variables
3. Redeploy (variables are injected at build time)

**GitHub Actions / CI/CD:**
```yaml
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
  VITE_RAZORPAY_KEY_ID: ${{ secrets.VITE_RAZORPAY_KEY_ID }}
  # ... other variables
```

**Docker:**
```dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build
```

### Verifying Environment Variables

After deployment, check the browser console. You should see:
```
🔗 API Base URL: [your-actual-api-url]
🔗 Environment Variable VITE_API_URL: [your-actual-api-url]
```

If you see "NOT SET" or "http://localhost:8000", the environment variable wasn't set during build.

## Notes

- All environment variables must be prefixed with `VITE_` to be accessible in the frontend
- After changing environment variables, **rebuild** the application (`npm run build`)
- Never commit `.env` file to version control (it's already in `.gitignore`)
- Environment variables are embedded at build time, not runtime
