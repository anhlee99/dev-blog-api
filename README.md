# Dev Blog API

A NestJS-based REST API for a development blog platform with user authentication, file uploads, and blog management features.

## ✨ Features

- 🔐 JWT-based authentication
- 📝 User registration and profile management  
- 🖼️ Secure file upload with validation
- 🛡️ Security middleware (Helmet, CORS)
- 📊 Request compression
- ⚡ Global exception handling
- 🔍 Input validation and sanitization
- 🗄️ PostgreSQL database integration

## 🚀 Technologies

- **Framework**: NestJS 10.x
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT
- **Validation**: class-validator
- **Security**: Helmet, CORS
- **File Upload**: Multer
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 16.20.1 or higher
- PostgreSQL 13.11 or higher
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dev-blog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=dev_blog
   
   # JWT (Generate a secure secret key)
   JWT_SECRET=your-super-secure-jwt-secret-key-min-32-chars
   
   # File uploads
   UPLOADED_FILES_DESTINATION=./public/upload
   ```

4. **Database setup**
   - Create a PostgreSQL database named `dev_blog`
   - Run migrations (if available) or let TypeORM create tables automatically

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000`

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/test` - Test endpoint

### User Management
- `GET /user/profile` - Get user profile (Protected)
- `POST /user/update` - Update user profile (Protected)

### File Upload
- `POST /common/upload-image` - Upload images (Protected)
- `POST /common/uploads` - Upload multiple files (Protected)

## 🔒 Security Features

- **Input Validation**: All requests are validated using class-validator
- **File Upload Security**: 
  - File type validation (images only)
  - File size limits (3MB max)
  - Maximum files per upload (10 files)
- **Security Headers**: Implemented via Helmet
- **CORS Protection**: Configurable CORS policy
- **JWT Authentication**: Secure token-based authentication

## 📁 Project Structure

```
src/
├── auth/           # Authentication module
├── commons/        # Common utilities and file upload
├── config/         # Configuration and middleware
├── entitys/        # Database entities
├── repository/     # Database repositories
├── users/          # User management
└── utils/          # Utility functions
```

## 🔧 Configuration

The application uses environment variables for configuration. See `.env.example` for all available options.

### Key configurations:
- **Database**: PostgreSQL connection settings
- **JWT**: Secret key and expiration
- **File Upload**: Destination path and limits
- **CORS**: Allowed origins and methods

## 🐛 Error Handling

The application includes global exception handling that:
- Logs all errors
- Returns consistent error responses
- Handles both HTTP exceptions and unexpected errors
- Includes request context in error logs

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Start the application**
   ```bash
   npm run start:prod
   ```

## 📝 Development Guidelines

- Follow NestJS best practices
- Use TypeScript strict mode
- Implement proper error handling
- Write unit tests for new features
- Validate all inputs
- Use DTOs for request/response validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
