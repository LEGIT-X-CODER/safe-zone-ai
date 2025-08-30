# SafeZone AI 🛡️

A modern, AI-powered travel safety platform that provides real-time risk assessment and community-driven safety intelligence for travelers worldwide.

## 🚀 Features

- **Real-time Safety Heatmap** - Interactive maps with color-coded risk zones
- **AI Risk Assessment** - Advanced algorithms for accurate safety scoring  
- **Community Incident Reporting** - Crowdsourced safety intelligence
- **Mobile-First Design** - Seamless experience across all devices
- **Route Planning** - AI-optimized safe travel routes
- **Emergency Response** - Quick access to local emergency services

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Radix UI + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Package Manager**: pnpm
- **Testing**: Vitest
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/safezone-ai.git

# Navigate to project directory
cd safezone-ai

# Install dependencies
pnpm install

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

- `/` - Homepage with safety overview
- `/safety-map` - Interactive safety heatmap
- `/report-incident` - Community incident reporting
- `/features` - Feature showcase
- `/community` - Community hub
- `/contact` - Contact information

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_PUBLIC_BUILDER_KEY=your_builder_key_here
PING_MESSAGE="ping pong"
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

## 📧 Contact

For questions and support, please reach out through the contact form in the application.

---

**SafeZone AI** - Travel safely with real-time risk intelligence 🌍✈️