# 🐱 Purrfect Cat Facts Generator

A delightful React application that fetches and displays random cat facts with a beautiful, animated UI. Built with modern web technologies including React Query for efficient data fetching and state management.


## ✨ Features

- 🎯 **Random Cat Facts**: Fetch fascinating facts about cats from the Cat Facts API
- 🔄 **Smart Caching**: Powered by TanStack React Query for optimal performance
- 🎨 **Beautiful UI**: Gradient backgrounds, floating animations, and responsive design
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- ⚡ **Fast Loading**: Built with Vite for lightning-fast development and builds
- 🎭 **Interactive Animations**: Floating paw prints, bouncing cats, and smooth transitions
- 🔥 **Modern Stack**: React 19, React Query 5, and latest web standards

## 🚀 Demo

The app features:
- Animated cat emojis that change mood
- Floating paw prints and hearts
- Gradient backgrounds with glassmorphism effects
- Loading states with spinning animations
- One-click fact generation

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Latest React with modern features
- **TanStack React Query 5.82.0** - Powerful data fetching library
- **React Router DOM 7.6.3** - Client-side routing
- **Lucide React 0.525.0** - Beautiful icons

### Build Tools
- **Vite 7.0.3** - Next generation build tool
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **ESLint 9.30.1** - Code linting and formatting

### HTTP Client
- **Axios 1.10.0** - Promise-based HTTP client

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-query
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action!

## 🏗️ Project Structure

```
react-query/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   └── home.jsx          # Main cat facts component
│   ├── App.jsx               # App component with routing
│   ├── App.css               # App-specific styles
│   ├── CatFactGenerator.css  # Component-specific styles
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── package.json
└── README.md
```

## 🎨 Styling Architecture

The app uses a hybrid approach combining:
- **Custom CSS** for complex animations and layouts (`CatFactGenerator.css`)
- **Tailwind CSS** utilities for rapid development
- **CSS Custom Properties** for consistent theming
- **Keyframe animations** for delightful interactions

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 API Integration

The app integrates with the [Cat Facts API](https://catfact.ninja/fact) to fetch random cat facts. React Query handles:

- ✅ Automatic caching
- ✅ Background refetching
- ✅ Loading states
- ✅ Error handling
- ✅ Manual refetch triggers

### Query Configuration
```javascript
const { data, isLoading, refetch } = useQuery({
  queryKey: ["cat"],
  queryFn: async () => {
    return await Axios.get("https://catfact.ninja/fact").then(
      (res) => res.data
    );
  },
  refetchOnWindowFocus: false,
});
```

## 🎯 Key Components

### Home Component (`src/components/home.jsx`)
- Main application logic
- React Query integration
- State management for cat moods
- Event handlers for user interactions

### Styling (`src/CatFactGenerator.css`)
- Responsive design breakpoints
- Custom animations and keyframes
- Glassmorphism effects
- Mobile-first approach

## 🚀 Performance Features

- **React Query Caching**: Intelligent data caching and synchronization
- **Vite HMR**: Hot module replacement for instant development feedback
- **Code Splitting**: Automatic code splitting with React Router
- **Optimized Animations**: GPU-accelerated CSS animations
- **Tree Shaking**: Unused code elimination in production builds

## 🎨 Design Highlights

- **Gradient Backgrounds**: Purple to pink to orange gradients
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Floating Elements**: Animated paw prints and hearts
- **Responsive Typography**: Scales beautifully across devices
- **Smooth Transitions**: Butter-smooth hover and click effects

## 🔮 Future Enhancements

- [ ] Add favorite facts functionality
- [ ] Implement fact categories/filters
- [ ] Add social sharing capabilities
- [ ] Include cat images with facts
- [ ] Add offline support with service workers
- [ ] Implement fact search functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Cat Facts API](https://catfact.ninja/) for providing amazing cat facts
- [TanStack Query](https://tanstack.com/query) for excellent data fetching
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for the amazing build tool

---

Made with ❤️ and lots of ☕ for cat lovers everywhere! 🐱

*Meow you have everything you need to get started! If you have any questions, feel free to open an issue.*
