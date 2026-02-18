# Mock Backend System

A complete mock backend implementation that intercepts all API calls and returns mock data. This allows full frontend development and testing without a real backend server.

## 📁 Structure

```
src/mockBackend/
├── index.js          # Main router and axios interceptor setup
├── database.js       # In-memory database simulation
├── auth.js           # Authentication endpoints
├── companies.js      # Company management endpoints
├── news.js           # News & Features endpoints
├── consents.js       # Consent management endpoints
├── users.js          # User management endpoints
├── participants.js   # Participant management endpoints
├── dashboard.js      # Dashboard statistics endpoints
└── README.md         # This file
```

## 🚀 How It Works

1. **Axios Interceptor**: Intercepts all axios requests
2. **Router**: Routes requests to appropriate mock handlers
3. **Database**: In-memory storage that persists during session
4. **Handlers**: Simulate real API responses with proper status codes

## 🔧 Configuration

The mock backend is automatically enabled when:
- `VITE_USE_MOCK_BACKEND=true` is set in `.env`
- `VITE_BASE_URL` is not set
- `VITE_BASE_URL` includes "localhost"

To explicitly enable/disable, set in `.env`:
```env
VITE_USE_MOCK_BACKEND=true   # Enable mock backend
# or
VITE_USE_MOCK_BACKEND=false  # Disable mock backend
```

## 🔐 Authentication

### Mock Users

The system includes 3 default users:

1. **Super Admin**
   - Username: `admin`
   - Password: `admin123`
   - Role: `superadmin`

2. **Health Coach**
   - Username: `healthcoach`
   - Password: `coach123`
   - Role: `healthcoaches`

3. **Admin**
   - Username: `admin2`
   - Password: `admin123`
   - Role: `admin`

### Login Flow

1. POST `/auth/login` with `{ username, password }`
2. Returns user data and access token
3. Token is stored in session (valid for 2 hours)
4. Token must be included in Authorization header: `Bearer {token}`

## 📡 API Endpoints

### Authentication
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Dashboard
- `GET /dashboard/stats` - Get basic statistics
- `GET /dashboard/stats/detailed` - Get detailed statistics

### Companies
- `GET /{role}/companies` - Get all companies
- `POST /{role}/companies/step1` - Create company (step 1)
- `PUT /{role}/companies/{id}/step2` - Update company (step 2)
- `PUT /{role}/companies/{id}/step3` - Update company (step 3)
- `PUT /{role}/companies/{id}` - Update company
- `DELETE /{role}/companies/{id}` - Delete company

### News & Features
- `GET /{role}/news/getAll` - Get all news
- `GET /{role}/news?companyId={id}` - Get company news
- `POST /{role}/news` - Create news
- `PUT /{role}/news/{id}` - Update news
- `DELETE /{role}/news/{id}` - Delete news

### Consents
- `GET /{role}/consents/companies` - Get companies for consents
- `GET /{role}/consents` - Get all consents
- `POST /{role}/consents` - Create consent
- `PUT /{role}/consents/{id}` - Update consent
- `DELETE /{role}/consents/{id}` - Delete consent

### Users
- `GET /{role}/users` - Get all users
- `POST /{role}/users` - Create user
- `PUT /{role}/users/{id}` - Update user
- `DELETE /{role}/users/{id}` - Delete user

### Participants
- `GET /{role}/participants/form-data` - Get form options
- `GET /{role}/participants` - Get all participants
- `GET /{role}/participants/{id}` - Get participant details
- `POST /{role}/participants` - Create participant
- `PUT /{role}/participants/{id}` - Update participant
- `DELETE /{role}/participants/{id}` - Delete participant

## 💾 Data Persistence

- **Session Storage**: Data persists during the browser session
- **Page Refresh**: Data resets on page refresh (fresh start)
- **In-Memory**: All data is stored in memory (no localStorage)

## 🎯 Features

✅ Full CRUD operations for all entities
✅ Authentication with token-based sessions
✅ Role-based access control
✅ Realistic API delays (500ms)
✅ Proper HTTP status codes
✅ Error handling
✅ Data relationships (companies, users, etc.)

## 🔍 Debugging

The mock backend logs to console:
- `🚀 Mock Backend Enabled` - When mock backend is active
- All API calls are intercepted and handled

## 📝 Adding New Endpoints

1. Create handler function in appropriate file (e.g., `companies.js`)
2. Add route in `index.js` router
3. Update this README

Example:
```javascript
// In companies.js
export const companyHandlers = {
  myNewEndpoint: async (token, role, data) => {
    await delay();
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }
    // Your logic here
    return { status: 200, data: { success: true, data: {} } };
  },
};
```

## ⚠️ Notes

- Mock backend simulates real API behavior but doesn't persist data across page refreshes
- All IDs are auto-generated
- Sessions expire after 2 hours
- Data is isolated per browser session

