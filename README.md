# Recolectando! 🌱

A modern web application for tracking waste collection activities by registered users, featuring public analytics and volunteer management capabilities.

## 🌟 Features

- **Waste Collection Tracking**: Log different types of waste (recyclable, compostable, non-recyclable)
- **User Authentication**: Secure JWT-based authentication with role management
- **Analytics Dashboard**: Public waste collection statistics and insights
- **Volunteer Management**: Registration and management system for project volunteers
- **Responsive Design**: Mobile-friendly interface built with modern React practices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Matt-if/RecolectandoFront.git
   cd RecolectandoFront
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   If you want full funcionalities you must create a `.env` file in the root directory to work with the back-end side (see [API Integration]())
   ```env
      VITE_API_URL="/api/v1"

      # Auth
      VITE_LOGIN_URL="/api/v1/auth/login"
      VITE_REGISTER_URL="/api/v1/auth/register"
      VITE_REFRESH_URL="/api/v1/auth/refresh"
      VITE_LOGOUT_URL="/api/v1/auth/logout"

      # Retrievals
      VITE_RETRIEVAL_URL="/api/v1/retrievals"
      VITE_RETRIEVAL_TYPES_URL="/api/v1/retrievals/types"

      #Buildings and sectors
      VITE_BUILDINGS_URL="/api/v1/buildings"
      VITE_SECTORS_FROM_BUILDING_BY_ID_URL="/api/v1/buildings/sectors" #/{id}

      # Analytics
      VITE_ANALYTICS_URL="/api/v1/analytics"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Authentication**: JWT (Access & Refresh Tokens)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: CSS3 with modern practices
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── ProtectedRoute.jsx
│   │   └── ConditionalRender.jsx
│   ├── pages/               # Page components
│   │   ├── login.jsx
│   │   ├── recoForm.jsx
│   │   └── userProfile.jsx
│   ├── context.jsx          # Global state management
│   └── mainDiv.jsx          # Main routing component
├── hooks/
│   └── useAuth.js          # Authentication hook
└── ...
```

## 🔐 Authentication System

This project implements a robust JWT-based authentication system with:

- **Access Tokens**: Short-lived stored in sessionStorage
- **Refresh Tokens**: Long-lived stored in localStorage
- **Automatic Token Renewal**: Seamless background token refresh
- **Role-Based Access Control**: Different permissions for users and admins

For detailed authentication documentation, see [AUTH_SYSTEM_en.md](AUTH_SYSTEM_en.md)

## 🎯 Usage

### For Users
1. **Login**: Access the system with your credentials
2. **Log Waste Collection**: Record waste retrieval activities with details like weight, volume, and type
3. **View Profile**: Manage your user information and collection history

### For Admins
- **User Management**: Register new users and manage permissions
- **Analytics**: Access detailed collection statistics and reports
- **System Administration**: Oversee all collection activities

## 📊 API Integration

The frontend integrates with a REST API backend that handles:
- User authentication and authorization
- Waste collection data management
- Analytics and reporting
- Building and sector information
Go to visit the API repo! --> https://github.com/Matt-if/RecolectandoAPI

## 🚧 Development Status

This project is currently **under active development**. Planned features include:

- [ ] Enhanced analytics dashboard
- [ ] Reporting system
- [ ] Mobile app companion
- [ ] Data export functionality

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linting

## 🐛 Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/Matt-if/RecolectandoFront/issues) on GitHub.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

