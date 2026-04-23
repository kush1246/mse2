# Student Grievance Management System

A complete MERN stack application for managing student grievances in educational institutions.

## Features

### Backend (Node.js + Express + MongoDB)
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Student Management**: Registration and login functionality
- **Grievance Management**: Full CRUD operations for grievances
- **Search**: Search grievances by title
- **Security**: Protected routes and error handling

### Frontend (React)
- **User Interface**: Clean and responsive design
- **Authentication**: Login and registration forms
- **Dashboard**: Complete grievance management interface
- **Forms**: Submit and edit grievances
- **Search**: Real-time search functionality
- **Protected Routes**: Only authenticated users can access dashboard

## Database Schema

### Student
- Name (String, Required)
- Email (String, Required, Unique)
- Password (String, Required, Hashed)

### Grievance
- Title (String, Required)
- Description (String, Required)
- Category (Enum: Academic/Hostel/Transport/Other)
- Date (Date, Default: Current Date)
- Status (Enum: Pending/Resolved, Default: Pending)
- Student (Reference to Student)

## API Endpoints

### Authentication
- `POST /api/register` - Register new student
- `POST /api/login` - Login student

### Grievances
- `POST /api/grievances` - Submit new grievance
- `GET /api/grievances` - Get all grievances for logged-in student
- `GET /api/grievances/:id` - Get specific grievance
- `PUT /api/grievances/:id` - Update grievance
- `DELETE /api/grievances/:id` - Delete grievance
- `GET /api/grievances/search?title=xyz` - Search grievances

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/grievance_system
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

### Running the Application

1. Make sure MongoDB is running on your system
2. Start the backend server (port 5000)
3. Start the frontend server (port 3000)
4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Registration**: Create a new account using the registration form
2. **Login**: Use your credentials to log in
3. **Dashboard**: Access your personal grievance dashboard
4. **Submit Grievance**: Click "Submit New Grievance" to report an issue
5. **Manage Grievances**: View, edit, update status, or delete your grievances
6. **Search**: Use the search bar to find specific grievances by title
7. **Logout**: Securely log out from your account

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes for authenticated users
- Input validation and sanitization
- Error handling for unauthorized access
- CORS configuration

## Error Handling

The application includes comprehensive error handling for:
- Invalid login credentials
- Duplicate email registration
- Unauthorized access attempts
- Database connection errors
- Form validation errors
- Server-side errors

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (Cross-Origin Resource Sharing)
- dotenv (environment variables)

### Frontend
- React 18
- React Router (navigation)
- Axios (HTTP client)
- CSS3 (styling)

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Student.js
│   │   └── Grievance.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── grievances.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── GrievanceForm.js
│   │   │   ├── GrievanceList.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── SearchBar.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
