# Business Process Enhancement Backend

A Flask-based backend application for document validation and processing using AI-powered document analysis and chatbot functionality.

## Features

- **Document Validation**: Validate various types of documents including:
  - Gramasewaka Certificates
  - Lease Documents
  - Affidavit Documents
- **AI-Powered Analysis**: Uses Google Gemini AI for intelligent document processing
- **File Storage**: AWS S3 integration for secure document storage
- **Database Integration**: Supabase for data persistence
- **Chatbot Support**: AI-powered chat assistance
- **Health Monitoring**: Built-in health check endpoints

## Tech Stack

- **Framework**: Flask 3.1.1
- **AI/ML**: Google Gemini AI (via LangChain)
- **Cloud Storage**: AWS S3
- **Database**: Supabase
- **File Processing**: OpenCV, PyPDF
- **Environment Management**: python-dotenv

## Prerequisites

- Python 3.8+
- Virtual environment (recommended)
- AWS account with S3 access
- Google AI API key
- Supabase account

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-process
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r rerequirements.txt
   ```

4. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

5. **Run the application**
   ```bash
   python app.py
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port number for the Flask application | `5000` |
| `FLASK_ENV` | Environment mode (`development` or `production`) | `development` |
| `GOOGLE_API_KEY` | Google Gemini AI API key | `your-google-api-key` |
| `MODEL_NAME` | Google Gemini model name | `gemini-pro` |
| `AWS_ORIGIN` | AWS region for S3 bucket | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | AWS access key ID | `your-aws-access-key` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key | `your-aws-secret-key` |
| `SUPABASE_URL` | Supabase project URL | `https://your-project.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | `your-supabase-anon-key` |

### Example .env file

```env
# Flask Configuration
PORT=5000
FLASK_ENV=development

# Google AI Configuration
GOOGLE_API_KEY=your-google-api-key-here
MODEL_NAME=gemini-pro

# AWS S3 Configuration
AWS_ORIGIN=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anonymous-key
```

## API Endpoints

### Health Check
- **GET/POST/PUT/PATCH** `/` - Application health check

### Document Validation

#### Gramasewaka Certificate
- **POST** `/api/document-validate/gnc`
- **Form Data**: 
  - `gnc`: Certificate file
  - `name`: Applicant name

#### Lease Document
- **POST** `/api/document-validate/lease`
- **Form Data**: 
  - `lease`: Lease document file
  - `name`: Applicant name
  - `address`: Applicant address

#### Affidavit Document
- **POST** `/api/document-validate/affidavit`
- **Form Data**: 
  - `affidavit`: Affidavit document file
  - `name`: Applicant name
  - `address`: Applicant address

### Chatbot
- **GET** `/api/chatbot/` - Chatbot health check
- **POST** `/api/chatbot/chat` - Chat with AI assistant
  - **JSON Body**:
    ```json
    {
      "query": "Your question here",
      "history": []
    }
    ```

## Project Structure

```
backend-process/
├── app/
│   ├── __init__.py                 # Flask app factory
│   ├── Config.py                   # Configuration classes
│   ├── libs/
│   │   ├── gemini_connection.py    # Google Gemini AI connection
│   │   ├── SupabaseClient.py       # Supabase client setup
│   │   └── prompt_generator/       # AI prompt templates
│   ├── route/                      # API route blueprints
│   │   ├── chat.py                 # Chat endpoints
│   │   ├── documentValidate.py     # Document validation endpoints
│   │   └── health.py               # Health check endpoints
│   ├── services/                   # Business logic services
│   │   └── chat_service.py         # Chat service implementation
│   └── utils/                      # Utility functions
│       ├── DocumentContentScraper.py
│       ├── pdfReader.py
│       ├── s3ObjectStore.py
│       └── databaseAction/
├── app.py                          # Application entry point
├── rerequirements.txt              # Python dependencies
└── README.md                       # This file
```

## Development

### Running in Development Mode
```bash
# Set environment to development
export FLASK_ENV=development  # On macOS/Linux
set FLASK_ENV=development     # On Windows

# Run the application
python app.py
```

### Running in Production Mode
```bash
# Set environment to production
export FLASK_ENV=production   # On macOS/Linux
set FLASK_ENV=production      # On Windows

# Run the application
python app.py
```

## Configuration

The application uses different configurations based on the `FLASK_ENV` environment variable:

- **Development**: Debug mode enabled
- **Production**: Debug mode disabled

## Error Handling

The application includes comprehensive error handling for:
- Missing files in requests
- Document processing failures
- AI service errors
- Database connection issues
- AWS S3 upload failures

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **API Keys**: Rotate API keys regularly
3. **AWS Credentials**: Use IAM roles with minimal required permissions
4. **File Upload**: Implement file type and size validation
5. **CORS**: Configure CORS settings for production use

## Troubleshooting

### Common Issues

1. **LangChain Deprecation Warnings**: Update to use `.invoke()` instead of `.__call__()`
2. **Missing Environment Variables**: Ensure all required variables are set in `.env`
3. **AWS S3 Permissions**: Verify AWS credentials have S3 read/write access
4. **Google AI API Limits**: Check API quota and billing status

### Logs

Check application logs for detailed error information:
```bash
python app.py 2>&1 | tee app.log
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license information here]

## Support

For support and questions, please [create an issue](link-to-issues) or contact the development team.
