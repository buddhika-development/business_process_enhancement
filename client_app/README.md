# Business Process Enhancement - Client Application

A comprehensive business registration platform built with Next.js, featuring multi-step forms, document validation, AI chatbot assistance, and automated email notifications.

## 🚀 Features

- **Multi-Step Business Registration**: Streamlined registration process with form validation
- **Document Upload & Validation**: AI-powered document verification for GN certificates, property ownership, and affidavits
- **Real-time Chat Support**: AI chatbot integration for instant customer assistance
- **Email Notifications**: Professional HTML email templates for registration confirmations
- **Database Integration**: Supabase backend for secure data storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Supabase** account and project
- **Gmail** account for email notifications (or other SMTP service)
- **Backend API** server running (Flask/Python)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd business_process_enhancement/client_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (see Environment Variables section below)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

### Required Environment Variables

```bash
# Backend API Configuration
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Service Configuration (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

### Environment Variables Description

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | URL of your backend API server | ✅ | `http://localhost:8000/api` |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous public key | ✅ | `eyJhbG...` |
| `EMAIL_USER` | Gmail address for sending emails | ✅ | `yourapp@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password (not your regular password) | ✅ | `abcd efgh ijkl mnop` |

### Setting Up Gmail App Password

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings → Security → 2-Step Verification
3. Generate an "App Password" for this application
4. Use the generated 16-character password (not your regular Gmail password)

### Environment-Specific Configuration

#### Development (.env.local)
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
NEXT_PUBLIC_SUPABASE_URL=https://your-dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key
EMAIL_USER=dev@yourcompany.com
EMAIL_PASSWORD=your_app_password
```

#### Production (.env.production)
```bash
NEXT_PUBLIC_BACKEND_URL=https://api.yourcompany.com/api
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
EMAIL_USER=noreply@yourcompany.com
EMAIL_PASSWORD=your_production_app_password
```

## 🗄️ Database Setup (Supabase)

### Required Tables

1. **business_details**
   ```sql
   CREATE TABLE business_details (
     id SERIAL PRIMARY KEY,
     business_name VARCHAR(255) NOT NULL,
     business_type VARCHAR(100),
     address TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **nic_details**
   ```sql
   CREATE TABLE nic_details (
     id SERIAL PRIMARY KEY,
     nic_number VARCHAR(20) UNIQUE NOT NULL,
     full_name VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Setting Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your URL and keys
3. Create the required tables using the SQL editor
4. Update your environment variables with the Supabase credentials

## 🔌 Backend API Requirements

This frontend application requires a backend API server with the following endpoints:

### Required Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chatbot/chat` | POST | AI chatbot conversation |
| `/document-validate/gnc` | POST | GN certificate validation |
| `/document-validate/lease` | POST | Property ownership validation |
| `/document-validate/affidavit` | POST | Affidavit document validation |

### API Request Format

**Chatbot:**
```json
{
  "query": "user message",
  "history": "[{\"role\": \"user\", \"content\": \"message\"}]"
}
```

**Document Validation:**
```bash
# Form data with file upload
FormData: {
  "file": [uploaded_file]
}
```

## 📁 Project Structure

```
src/
├── actions/                    # Server actions for form handling
├── app/                       # Next.js 13+ app directory
│   ├── api/                   # API routes
│   ├── (BaseNavigation)/      # Route groups
│   └── styles/                # Global styles
├── components/                # React components
│   ├── layout/               # Layout components
│   └── ui/                   # UI components
├── lib/                      # Utility libraries
│   ├── databaseActions/      # Database operations
│   ├── emailTemplates/       # Email templates
│   └── supabase/            # Supabase client
├── navigation/               # Navigation configuration
└── types/                    # TypeScript type definitions
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production

Make sure to set these in your deployment platform:

```bash
NEXT_PUBLIC_BACKEND_URL=https://your-production-api.com/api
NEXT_PUBLIC_SUPABASE_URL=https://your-production-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
EMAIL_USER=noreply@yourcompany.com
EMAIL_PASSWORD=your_production_app_password
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

## 📚 Key Dependencies

- **Next.js 15.5.2** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend as a Service
- **Nodemailer** - Email sending
- **React Hook Form** - Form handling

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **API Keys**: Use different keys for development and production
3. **Email Passwords**: Use app-specific passwords, not main account passwords
4. **CORS**: Ensure your backend API has proper CORS configuration
5. **Validation**: All user inputs are validated both client-side and server-side

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to fetch" errors**
   - Check if backend API is running
   - Verify `NEXT_PUBLIC_BACKEND_URL` is correct
   - Ensure CORS is configured on backend

2. **Email sending fails**
   - Verify Gmail app password is correct
   - Check if 2FA is enabled on Gmail account
   - Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are set

3. **Supabase connection issues**
   - Verify Supabase URL and keys
   - Check if required tables exist
   - Ensure RLS policies are configured

4. **Environment variables not loading**
   - Restart development server after changes
   - Ensure `.env.local` is in the root directory
   - Check variable names have `NEXT_PUBLIC_` prefix for client-side access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

**Built with ❤️ by the Business Process Enhancement Team**
