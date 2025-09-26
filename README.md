# Memory Game - Microsoft DevOps Day

A full-stack memory card game built with C# Web API backend and React TypeScript frontend, featuring comprehensive CI/CD pipelines with GitHub Actions.

## 🎮 Game Features

- **Interactive Memory Game**: Click cards to find matching pairs
- **Multiple Grid Sizes**: 2x2, 4x4, and 6x6 grids
- **Real-time Statistics**: Track moves and matches
- **Game Completion Detection**: Celebration when all pairs are found
- **Reset & New Game**: Start fresh anytime
- **Responsive Design**: Works on desktop and mobile

## 🏗️ Architecture

### Backend (C# Web API)
- **ASP.NET Core 9.0** with minimal APIs
- **RESTful API** design with proper HTTP status codes
- **In-memory game state management** with thread-safe operations
- **Comprehensive unit tests** with xUnit
- **CORS enabled** for React frontend integration

### Frontend (React TypeScript)
- **React 18** with TypeScript for type safety
- **Component-based architecture** with reusable UI elements
- **CSS animations** for card flipping effects
- **Error handling** and loading states
- **Jest & Testing Library** for component testing

### CI/CD Pipeline
- **GitHub Actions workflows** for automated testing
- **Separate pipelines** for backend and frontend
- **Pull Request validation** with status checks
- **Code coverage reporting** (optional with Codecov)
- **Build artifact generation** for deployments

## 🚀 Getting Started

### Prerequisites
- [.NET 9.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Backend Setup

1. **Navigate to the API directory**:
   ```bash
   cd api/MemoryGameApi
   ```

2. **Restore dependencies and run**:
   ```bash
   dotnet restore
   dotnet run
   ```

3. **The API will be available at**: `http://localhost:5000`

4. **Run tests**:
   ```bash
   cd ../MemoryGameApi.Tests
   dotnet test
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend/memory-game
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **The app will be available at**: `http://localhost:3000`

5. **Run tests**:
   ```bash
   npm test
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```

## 🔌 API Endpoints

### Game Management
- `POST /api/game/create?gridSize=4` - Create a new game
- `GET /api/game/{gameId}` - Get game state
- `POST /api/game/move` - Make a move
- `POST /api/game/{gameId}/reset` - Reset game
- `DELETE /api/game/{gameId}` - Delete game

### Example API Usage

**Create a new game**:
```bash
curl -X POST "http://localhost:5000/api/game/create?gridSize=4"
```

**Make a move**:
```bash
curl -X POST "http://localhost:5000/api/game/move" \
  -H "Content-Type: application/json" \
  -d '{"gameId": "your-game-id", "cardPosition": 0}'
```

## 🧪 Testing

### Backend Tests
- **Unit tests** for game logic and services
- **Integration tests** for API endpoints
- **Coverage**: Core game mechanics and edge cases

### Frontend Tests
- **Component tests** with React Testing Library
- **User interaction testing** with fireEvent
- **Mock API integration** for isolated testing

### Running All Tests
```bash
# Backend tests
cd api/MemoryGameApi.Tests && dotnet test

# Frontend tests
cd frontend/memory-game && npm test
```

## 🔄 CI/CD Workflows

### Backend CI (`backend-ci.yml`)
- Triggers on changes to `api/` directory
- .NET build, test, and coverage reporting
- Runs on Ubuntu with .NET 9.0

### Frontend CI (`frontend-ci.yml`)
- Triggers on changes to `frontend/` directory
- Node.js build, test, lint, and coverage reporting
- Uploads build artifacts for deployment

### PR Checks (`pr-checks.yml`)
- Validates pull request titles
- Checks for sensitive files
- Runs targeted tests based on changed files
- Ensures project structure integrity

## 📁 Project Structure

```
Microsoft-devOps-day/
├── api/
│   ├── MemoryGameApi/              # Web API project
│   │   ├── Controllers/            # API controllers
│   │   ├── Models/                 # Data models
│   │   ├── Services/               # Business logic
│   │   └── Program.cs              # Application entry point
│   └── MemoryGameApi.Tests/        # Unit tests
├── frontend/
│   └── memory-game/                # React application
│       ├── src/
│       │   ├── components/         # React components
│       │   ├── services/           # API service layer
│       │   └── types/              # TypeScript interfaces
│       └── public/                 # Static assets
├── .github/
│   └── workflows/                  # GitHub Actions
└── README.md                       # This file
```

## 🛠️ Development Guidelines

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting for consistency
- **Prettier**: Code formatting (if configured)
- **Unit Testing**: Comprehensive test coverage

### Git Workflow
- **Feature branches**: Create branches for new features
- **Pull Requests**: All changes via PR with status checks
- **Semantic commits**: Use conventional commit messages

### Security
- **No secrets in code**: Use environment variables
- **CORS configured**: Limited to development origins
- **Input validation**: API validates all inputs

## 🚀 Deployment

### Backend Deployment
The API can be deployed to:
- **Azure App Service**
- **AWS Elastic Beanstalk**
- **Docker containers**
- **IIS on Windows Server**

### Frontend Deployment
The React app can be deployed to:
- **Azure Static Web Apps**
- **AWS S3 + CloudFront**
- **Netlify**
- **Vercel**

### Environment Configuration
Update API base URL in `frontend/memory-game/src/services/GameService.ts` for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📋 License

This project is part of Microsoft DevOps Day and is intended for educational purposes.

## 🎯 Learning Objectives

This project demonstrates:
- **Full-stack development** with modern technologies
- **RESTful API design** and implementation
- **React component architecture** and state management
- **Automated testing** strategies and best practices
- **CI/CD pipeline** configuration with GitHub Actions
- **Code quality** and security considerations