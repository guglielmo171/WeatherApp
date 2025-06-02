# 🌤️ WeatherApp - Advanced Weather Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)](https://vitejs.dev/)
[![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-black)](https://ui.shadcn.com/)

> Advanced weather dashboard with smart city search, favorites management, and detailed analytics. Built with modern React ecosystem and Shadcn/ui components.

## 🌟 **Live Demo**

🔗 **[View Live Demo](https://weatherapp-demo.vercel.app)** | 📱 **[Mobile Demo](https://weatherapp-demo.vercel.app/mobile)**

![WeatherApp Dashboard](./docs/images/weather-dashboard.png)

---

## ✨ **Core Features**

### 🔍 **Smart City Search**
- **Command Palette** - Fast city search with keyboard shortcuts (⌘K)
- **Autocomplete** - Intelligent city suggestions with fuzzy matching
- **Multiple Formats** - Search by city name, coordinates, or postal code
- **Recent Searches** - Quick access to previously searched locations

### ⭐ **Favorites Management**
- **Bookmark Cities** - Save frequently checked locations
- **Quick Access** - Sidebar with favorite cities for instant switching
- **Persistent Storage** - Favorites saved locally with sync capabilities
- **Bulk Management** - Add, remove, and reorder favorite locations

### 📊 **Detailed Weather Analytics**
- **Hourly Breakdown** - Complete 24-hour weather timeline
- **Humidity Charts** - Interactive hourly humidity graphs with Recharts
- **Temperature Trends** - Visual temperature progression throughout the day
- **Weather Metrics** - Pressure, wind speed, UV index, and air quality data

### 🎨 **Modern UI/UX**
- **Shadcn/ui Components** - Beautiful, accessible component library
- **Responsive Design** - Optimized for all screen sizes
- **Dark/Light Mode** - Theme switching with system preference
- **Loading States** - Skeleton loading and smooth transitions

### 📱 **Enhanced Navigation**
- **React Router** - Client-side routing with city-specific URLs
- **Breadcrumb Navigation** - Clear location hierarchy
- **Back/Forward** - Browser history integration
- **Deep Linking** - Shareable URLs for specific cities

---

## 🛠 **Tech Stack**

**Core Framework**
- React 18.2 + TypeScript 5.8 + Vite 6.3

**UI & Components**
- Shadcn/ui + Radix UI + Tailwind CSS + Lucide Icons

**Data & State**
- TanStack Query + Axios + React Hook Form + Zod

**Charts & Analytics**
- Recharts + Date-fns

**Navigation & UX**
- React Router + CMDK (Command Palette) + Sonner (Toasts)

---

## 🚀 **Quick Start**

```bash
# Clone and install
git clone https://github.com/yourusername/weatherapp.git
cd weatherapp
npm install

# Setup environment variables
cp .env.example .env.local
# Add your OpenWeatherMap API key

# Start development server
npm run dev
# Open http://localhost:5173
```

### **Environment Setup**

```bash
# OpenWeatherMap API configuration
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_APP_NAME="WeatherApp"
VITE_API_BASE_URL="https://api.openweathermap.org/data/2.5"
```

### **Available Commands**

```bash
npm run dev          # Development server with hot reload
npm run build        # Production build with TypeScript check
npm run lint         # ESLint with TypeScript rules
npm run preview      # Preview production build
```

---

## 📁 **Project Structure**

```
src/
├── app/                    # Main application logic
├── assets/                 # Static assets and images
├── components/             # React components
│   ├── ui/                # Shadcn/ui base components
│   ├── weather/           # Weather-specific components
│   ├── charts/            # Recharts analytics components
│   └── search/            # Search and command palette
├── configuration/          # App configuration and settings
├── core/                  # Core utilities and business logic
├── routes.tsx             # React Router configuration
├── main.tsx               # Application entry point
└── vite-env.d.ts         # Vite TypeScript definitions
```

---

## 🎮 **Key Features Demo**

### **Command Palette Search**
- Press `⌘K` (Mac) or `Ctrl+K` (Windows) to open search
- Type city name for instant autocomplete suggestions
- Arrow keys to navigate, Enter to select
- ESC to close or clear search

### **Favorites System**
- Star icon on any city to add to favorites
- Favorites sidebar for quick access to saved cities
- Drag and drop to reorder favorites
- Remove favorites with confirmation dialog

### **Weather Analytics Dashboard**
- **Current Conditions**: Temperature, humidity, pressure, wind
- **Hourly Humidity Chart**: Interactive 24-hour humidity graph
- **Temperature Timeline**: Hourly temperature progression with min/max indicators
- **Weather Details**: UV index, visibility, sunrise/sunset, air quality

### **Responsive Navigation**
- Desktop: Sidebar with favorites + main content area
- Tablet: Collapsible sidebar with overlay panels
- Mobile: Bottom navigation with swipe gestures

---

## 🎯 **Technical Highlights**

### **Advanced React Patterns**
- **Custom Hooks**: Reusable logic for weather data and favorites
- **Context API**: Theme and user preferences management
- **Error Boundaries**: Graceful error handling with fallback UI
- **Route-based Architecture**: Clean separation with React Router

### **Data Management**
- **TanStack Query**: Enhanced queryClient with intelligent caching
- **Optimistic Updates**: Instant UI feedback for favorites
- **Background Sync**: Automatic weather data refresh with loaders
- **Error Recovery**: Retry logic for failed API requests

### **Performance Optimization**
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Lazy loaded weather icons
- **Memoization**: Optimized re-renders with React.memo
- **Bundle Analysis**: Tree-shaking and dependency optimization

### **Accessibility & UX**
- **WCAG 2.1 AA**: Full accessibility compliance
- **Keyboard Navigation**: Complete keyboard support
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Logical tab order and focus trapping

---

## 🚧 **Development Status**

### **Recent Improvements**
- ✅ **Enhanced QueryClient**: Refactored data fetching with improved caching strategies
- ✅ **Homepage Refactor**: Redesigned weather management logic for better UX
- ✅ **Route Optimization**: Enhanced loader performance with intelligent caching
- 🔄 **Axios Integration**: Planned migration for improved HTTP client functionality

### **Current Focus**
- Performance optimization of data fetching
- Enhanced error handling and offline capabilities
- Mobile responsiveness improvements
- Component architecture refinement

---

## 📊 **Weather Data Integration**

### **API Endpoints Used**
```typescript
// Current weather
GET /weather?q={city}&appid={key}

// 5-day forecast with hourly data
GET /forecast?q={city}&appid={key}

// Air quality data
GET /air_pollution?lat={lat}&lon={lon}&appid={key}
```

### **Data Processing**
- **Real-time Updates**: 15-minute refresh intervals
- **Caching Strategy**: Smart caching with TanStack Query
- **Error Handling**: Fallback to cached data on API failures
- **Rate Limiting**: Intelligent request throttling

---

## 📱 **Responsive Features**

### **Mobile Optimizations**
- **Touch Gestures**: Swipe between cities and forecast days
- **Bottom Sheet**: Mobile-friendly modals and overlays
- **Optimized Charts**: Touch-friendly interactive charts
- **Fast Loading**: Optimized bundle size for mobile networks

### **Desktop Features**
- **Keyboard Shortcuts**: Power user navigation
- **Multi-panel Layout**: Sidebar + main content + details panel
- **Hover States**: Rich interactive feedback
- **Context Menus**: Right-click actions for advanced users

---

## 🔧 **Configuration**

### **Shadcn/ui Setup**
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add components as needed
npx shadcn-ui@latest add command
npx shadcn-ui@latest add chart
npx shadcn-ui@latest add toast
```

### **Chart Configuration**
```typescript
// Recharts humidity chart config
const chartConfig = {
  humidity: {
    theme: {
      light: '#3b82f6',
      dark: '#60a5fa'
    }
  }
}
```

---

## 🚀 **Deployment**

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

**Environment Variables for Production**:
```bash
VITE_OPENWEATHER_API_KEY=your_production_api_key
VITE_APP_NAME="WeatherApp"
VITE_NODE_ENV=production
```

**Deployment Platforms**: Vercel (recommended), Netlify, GitHub Pages

---

## 📊 **Demo Highlights**

### **Advanced Features Showcase**
- **Real-time Weather Data** from OpenWeatherMap API
- **Interactive Charts** with Recharts for humidity analysis
- **Modern Component Library** with Shadcn/ui
- **Professional UX** with command palette and favorites
- **Type Safety** with comprehensive TypeScript implementation
- **Performance** with TanStack Query caching and optimization

### **Enterprise-Ready Patterns**
- Modular component architecture
- Comprehensive error handling
- Accessibility compliance
- Mobile-first responsive design
- SEO-friendly routing
- Production build optimization

---

## 📞 **Contact & Links**

- 🔗 **Live Demo**: [weatherapp-demo.vercel.app](https://weatherapp-demo.vercel.app)
- 💻 **GitHub**: [github.com/yourusername/weatherapp](https://github.com/yourusername/weatherapp)
- 🐛 **Issues**: [Report bugs or request features](https://github.com/yourusername/weatherapp/issues)

---

## 📜 **License**

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**Built with ❤️ using React, TypeScript, Shadcn/ui, and modern web technologies**

</div>