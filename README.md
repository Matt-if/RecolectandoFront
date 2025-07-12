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
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL="http://localhost:8080/api/v1"
   VITE_LOGIN_URL="http://localhost:8080/api/v1/auth/login"
   VITE_REFRESH_URL="http://localhost:8080/api/v1/auth/refresh"
   VITE_RETRIEVAL_URL="http://localhost:8080/api/v1/retrieval"
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

- **Access Tokens**: Short-lived (15-30 min) stored in sessionStorage
- **Refresh Tokens**: Long-lived (7-30 days) stored in localStorage
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

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linting

## 🐛 Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/Matt-if/RecolectandoFront/issues) on GitHub.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Thanks to all contributors and volunteers
- Built with ❤️ for environmental sustainability

---

**Made with 🌱 by the Recolectando! team**
