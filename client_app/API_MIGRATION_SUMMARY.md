# API URL Migration Summary

## Changes Made

All hardcoded API URLs have been replaced with environment variables to make the application more flexible and environment-aware.

### Files Updated:

1. **`src/app/api/chatbot/route.ts`**
   - **Before:** `'http://127.0.0.1:8000/api/chatbot/chat'`
   - **After:** `${process.env.NEXT_PUBLIC_BACKEND_URL}/chatbot/chat`

2. **`src/actions/BusinessSupportDocumentForm.ts`**
   - **Before:** `'http://127.0.0.1:8000/api/document-validate/gnc'`
   - **After:** `${process.env.NEXT_PUBLIC_BACKEND_URL}/document-validate/gnc`
   
   - **Before:** `'http://127.0.0.1:8000/api/document-validate/lease'`
   - **After:** `${process.env.NEXT_PUBLIC_BACKEND_URL}/document-validate/lease`
   
   - **Before:** `'http://127.0.0.1:8000/api/document-validate/affidavit'`
   - **After:** `${process.env.NEXT_PUBLIC_BACKEND_URL}/document-validate/affidavit`

## Environment Configuration

Your `.env` file should contain:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
```

### For Different Environments:

**Development (.env.local):**
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
```

**Production (.env.production):**
```
NEXT_PUBLIC_BACKEND_URL=https://your-production-backend.com/api
```

**Staging (.env.staging):**
```
NEXT_PUBLIC_BACKEND_URL=https://your-staging-backend.com/api
```

## Benefits

1. **Environment Flexibility**: Easy to switch between development, staging, and production backends
2. **Security**: No hardcoded URLs in the codebase
3. **Maintainability**: Single place to update API endpoints
4. **Deployment Ready**: Works with different deployment environments

## Important Notes

- The `NEXT_PUBLIC_` prefix makes this variable available to client-side code
- Make sure to restart your development server after changing environment variables
- Add appropriate `.env.*` files to your `.gitignore` if they contain sensitive information
