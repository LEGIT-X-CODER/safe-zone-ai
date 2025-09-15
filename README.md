# SafeZone AI 🛡️

A modern, AI-powered travel safety platform with **Firebase Authentication** that provides real-time risk assessment and community-driven safety intelligence for travelers worldwide.

## 🚀 Features

- **🔐 Firebase Authentication** - Complete user management with Google Sign-In
- **👤 User Profile Management** - Editable profiles with secure data storage
- **🛡️ Protected Routes** - Secure access to premium features
- **🗺️ Real-time Safety Heatmap** - Interactive maps with color-coded risk zones
- **🤖 AI Risk Assessment** - Advanced algorithms for accurate safety scoring  
- **📍 Community Incident Reporting** - Crowdsourced safety intelligence
- **📱 Mobile-First Design** - Seamless experience across all devices
- **🛣️ Route Planning** - AI-optimized safe travel routes
- **🚨 Emergency Response** - Quick access to local emergency services

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Authentication**: Firebase Auth with Google Sign-In
- **Database**: Firestore for user profiles
- **UI Framework**: Radix UI + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Package Manager**: pnpm
- **Testing**: Vitest
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/aditii23/safezone.ai.git

# Navigate to project directory
cd safezone-ai

# Install dependencies
pnpm install

# Setup environment variables (see below)
cp .env.example .env

# Start development server
pnpm dev
```

## 🏃‍♂️ Quick Start

1. **Development Server**: `pnpm dev` - Runs on http://localhost:8080
2. **Build Production**: `pnpm build`
3. **Start Production**: `pnpm start`
4. **Run Tests**: `pnpm test`

## 📁 Project Structure

```
safezone-ai/
├── client/                 # React frontend
│   ├── pages/             # Route components
│   ├── components/        # Reusable UI components
│   └── hooks/             # Custom React hooks
├── server/                # Express backend
│   ├── routes/            # API route handlers
│   └── index.ts           # Server configuration
├── shared/                # Shared types & utilities
└── public/                # Static assets
```

## 🎯 Available Routes

### Public Routes
- `/` - Homepage with safety overview
- `/features` - Feature showcase  
- `/contact` - Contact information
- `/login` - User authentication
- `/signup` - User registration
- `/forgot-password` - Password reset

### Protected Routes (Requires Authentication)
- `/profile` - User profile management
- `/safety-map` - Interactive safety heatmap
- `/report-incident` - Community incident reporting
- `/community` - Community hub

## 🔐 Authentication Features

- **Google Sign-In**: One-click authentication with Google
- **Email/Password**: Traditional email registration and login
- **Profile Management**: Edit profile information, bio, location
- **Protected Routes**: Automatic redirect to login for secured pages
- **User Sessions**: Persistent login across browser sessions
- **Password Reset**: Email-based password recovery

## ⚠️ Troubleshooting

**"Access Denied" after Google Sign-In?**
- This is normal! The app shows a loading state while creating your profile
- Wait 2-3 seconds for profile creation to complete
- If issue persists, check Firebase configuration in `.env`

**Profile page not loading?**
- Ensure Firestore is enabled in Firebase Console
- Check network connection
- Verify Firebase credentials are correct

## 🔧 Environment Variables

⚠️ **Important**: You need Firebase credentials to run this app!

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore
3. Get your Firebase configuration
4. Copy `.env.example` to `.env` and fill in your Firebase credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

# Development Environment
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React and TypeScript
- UI components powered by Radix UI
- Styling with Tailwind CSS
- Icons from Lucide React

## About the Project
This website frontend was created using Builder.io as a design tool, but all the code, logic, and customization were developed and implemented by me.

## 📧 Contact

For questions and support, please reach out through the contact form in the application.

---

**SafeZone AI** - Travel safely with real-time risk intelligence ..🌍✈️
