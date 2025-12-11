# Development Documentation

This document outlines the development work done on the Node.js Express Boilerplate, customized for a staff management system.

## Overview

This application is built on the Node.js Express Boilerplate and has been extended with specific features for managing staff in a healthcare or organizational context. It includes admin authentication and staff CRUD operations.

## Architecture

The application follows a layered architecture:

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Define data schemas and database interactions
- **Validations**: Input validation using Joi
- **Middlewares**: Authentication, error handling, rate limiting, etc.

### Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Apps   │────│   Express App   │────│   MongoDB DB    │
│                 │    │                 │    │                 │
│ - Web Browsers  │    │ - Routes        │    │ - Admin         │
│ - Mobile Apps   │    │ - Controllers   │    │ - Staff         │
│ - API Clients   │    │ - Services      │    │ - Tokens        │
└─────────────────┘    │ - Models        │    └─────────────────┘
                       │ - Middlewares   │
                       │ - Utils         │
                       └─────────────────┘
```

### Data Flow

1. **Request** → Routes → Validation Middleware → Auth Middleware
2. **Controller** → Service → Model → Database
3. **Response** ← Controller ← Service ← Model ← Database
4. **Error Handling** → Centralized Error Middleware → Client

### Key Components

- **Routes Layer**: Entry point, defines API endpoints
- **Controller Layer**: Handles HTTP requests/responses, delegates to services
- **Service Layer**: Business logic, data processing
- **Model Layer**: Database schemas, queries, plugins
- **Middleware Layer**: Cross-cutting concerns (auth, validation, logging, security)
- **Utils Layer**: Helper functions, error classes

## Features Implemented

### 1. Admin Authentication

- **Endpoint**: `POST /v1/auth/admin/login`
- **Functionality**: Admin login using username and password
- **Security**: JWT-based authentication with access and refresh tokens
- **Model**: Admin model with username, password (hashed), and name fields

### 2. Staff Management

- **Endpoints**:
  - `POST /v1/staff` - Create new staff member
  - `GET /v1/staff` - Get all staff with filtering and pagination
  - `GET /v1/staff/:staffId` - Get staff by ID
- **Features**:
  - Staff roles: nurse, doctor, technician, admin
  - Shift preferences
  - Email uniqueness validation
  - Pagination and sorting support

### 3. Security Features

- JWT authentication middleware
- Password hashing with bcrypt
- Input sanitization (XSS, MongoDB injection)
- Rate limiting on auth endpoints
- Helmet for security headers
- CORS support

### 4. Data Validation

- Request validation using Joi schemas
- Custom password validation
- Email format validation

### 5. Error Handling

- Centralized error handling middleware
- Custom ApiError class
- Consistent error response format

### 6. Database

- MongoDB with Mongoose ODM
- Custom plugins: toJSON and paginate
- Connection handling for both local and serverless environments

### 7. Logging

- Winston logger with multiple levels
- Morgan for HTTP request logging
- Environment-based log levels

### 8. API Documentation

- Swagger/OpenAPI documentation
- Available at `/v1/docs` in development mode

## Code Structure

```
src/
├── config/          # Configuration files (database, JWT, etc.)
├── controllers/     # Request handlers
│   ├── auth.controller.js
│   └── staff.controller.js
├── middlewares/     # Express middlewares
├── models/          # Mongoose models
│   ├── admin.model.js
│   ├── staff.model.js
│   ├── token.model.js
│   └── user.model.js
├── routes/v1/       # API routes
│   ├── auth.route.js
│   └── staff.route.js
├── services/        # Business logic
│   ├── auth.service.js
│   └── staff.service.js
├── utils/           # Utility functions
├── validations/     # Joi validation schemas
└── app.js           # Express app setup
```

## Development Guidelines

### Adding New Features

1. **Model**: Create or update Mongoose model in `src/models/`
2. **Validation**: Define Joi schema in `src/validations/`
3. **Service**: Implement business logic in `src/services/`
4. **Controller**: Create controller functions in `src/controllers/`
5. **Routes**: Define routes in `src/routes/v1/`
6. **Tests**: Add unit and integration tests

### Authentication

Use the `auth()` middleware to protect routes:

```javascript
router.post('/protected', auth(), controllerFunction);
```

### Validation

Validate requests using the `validate` middleware:

```javascript
router.post('/endpoint', validate(validationSchema), controllerFunction);
```

### Error Handling

Use `catchAsync` wrapper for async controllers:

```javascript
const controller = catchAsync(async (req, res) => {
  // logic here
});
```

Throw `ApiError` for custom errors:

```javascript
throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
```

### Pagination

Use the paginate plugin on models for paginated queries:

```javascript
const result = await Model.paginate(filter, options);
```

## Testing

- Unit tests in `tests/unit/`
- Integration tests in `tests/integration/`
- Run tests with `yarn test`
- Coverage with `yarn coverage`

## Deployment

- Docker support with `docker-compose` files
- PM2 for production process management
- Vercel support for serverless deployment

## Environment Variables

Key environment variables (see `.env.example`):

- `NODE_ENV`: development/production
- `PORT`: Server port
- `MONGODB_URL`: Database connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_ACCESS_EXPIRATION_MINUTES`: Access token expiry
- `JWT_REFRESH_EXPIRATION_DAYS`: Refresh token expiry

## Future Enhancements

Potential areas for development:

1. **User Management**: Implement full user registration/login (currently only admin login)
2. **Role-based Permissions**: Extend authorization beyond basic auth
3. **Email Services**: Implement password reset, email verification
4. **File Upload**: Add support for staff profile images
5. **Audit Logging**: Track changes to staff records
6. **Real-time Updates**: WebSocket support for live staff updates
7. **Advanced Filtering**: More complex query options for staff search
