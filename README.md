# Energy Anvi - MERN Stack Website

A comprehensive energy management website built with the MERN stack (MongoDB, Express.js, React, Node.js), replicating the functionality of energy.anvi.co with modern features and responsive design.

## 🌟 Features

### Frontend (React + TypeScript)
- **Modern UI/UX**: Built with styled-components and Framer Motion animations
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Energy Dashboard**: Interactive data visualization with charts and analytics
- **Project Management**: Comprehensive project tracking and management system
- **Blog System**: Full-featured blog with categories, tags, and comments
- **User Authentication**: Secure login/registration with JWT tokens
- **Contact Forms**: Multiple contact forms with email notifications
- **Real-time Notifications**: Toast notifications for user feedback

### Backend (Node.js + Express)
- **RESTful API**: Well-structured API endpoints for all features
- **Authentication & Authorization**: JWT-based auth with role-based access
- **Database Models**: Comprehensive MongoDB schemas for all data types
- **Email Integration**: Nodemailer for contact forms and notifications
- **File Upload**: Multer integration for image and document uploads
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Error Handling**: Comprehensive error handling and logging

### Data Models
- **Users**: User management with roles and profiles
- **Energy Data**: Energy consumption and production tracking
- **Projects**: Project management with timelines and budgets
- **Blog Posts**: Content management with SEO optimization
- **Contact**: Contact form submissions and inquiries

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd energy-anvi-website
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/energy-anvi
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   
   # Email configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # API Keys
   WEATHER_API_KEY=your_weather_api_key
   ENERGY_DATA_API_KEY=your_energy_data_api_key
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system or update the MONGODB_URI to point to your cloud instance.

6. **Run the application**
   
   Development mode (both frontend and backend):
   ```bash
   npm run dev
   ```
   
   Or run them separately:
   ```bash
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   npm run client
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
energy-anvi-website/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   └── Layout/         # Layout components
│   │   ├── contexts/           # React contexts
│   │   ├── pages/              # Page components
│   │   ├── styles/             # Global styles and theme
│   │   ├── utils/              # Utility functions
│   │   └── App.tsx             # Main App component
│   ├── package.json
│   └── tsconfig.json
├── models/                     # MongoDB models
├── routes/                     # Express routes
├── middleware/                 # Custom middleware
├── .env                        # Environment variables
├── server.js                   # Express server
├── package.json                # Backend dependencies
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 19**: Latest React with hooks and functional components
- **TypeScript**: Type-safe JavaScript development
- **Styled Components**: CSS-in-JS styling solution
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **React Query**: Data fetching and state management
- **React Hook Form**: Form handling and validation
- **Recharts**: Data visualization and charts
- **Lucide React**: Modern icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Nodemailer**: Email sending
- **Multer**: File upload handling
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing

## 🎨 Design Features

- **Energy-focused Color Scheme**: Green and amber colors representing sustainability
- **Modern Typography**: Inter font family for clean readability
- **Responsive Grid System**: Flexible layouts for all screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Dark/Light Mode Ready**: Theme structure supports multiple themes

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Energy Data
- `GET /api/energy` - Get all energy data
- `GET /api/energy/stats` - Get energy statistics
- `POST /api/energy` - Create energy data (authenticated)
- `PUT /api/energy/:id` - Update energy data (authenticated)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `POST /api/projects` - Create project (authenticated)
- `PUT /api/projects/:id` - Update project (authenticated)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/featured` - Get featured posts
- `POST /api/blog` - Create blog post (authenticated)
- `POST /api/blog/:id/like` - Like/unlike post (authenticated)

### Contact
- `POST /api/contact` - Send contact message
- `POST /api/contact/newsletter` - Subscribe to newsletter
- `POST /api/contact/quote` - Request project quote

## 🔧 Development

### Available Scripts

In the project directory:
- `npm start` - Start production server
- `npm run server` - Start development server with nodemon
- `npm run client` - Start React development server
- `npm run dev` - Start both frontend and backend in development
- `npm run build` - Build React app for production

### Code Style
- ESLint and Prettier configured for consistent code formatting
- TypeScript strict mode enabled
- Styled Components with theme provider for consistent styling

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
Update your production environment with:
- `NODE_ENV=production`
- `MONGODB_URI` - Your production MongoDB connection string
- `CLIENT_URL` - Your production frontend URL
- `JWT_SECRET` - Strong secret key for JWT tokens

### Deployment Platforms
- **Backend**: Heroku, DigitalOcean, AWS EC2
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Database**: MongoDB Atlas, AWS DocumentDB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original design inspiration from energy.anvi.co
- Icons by Lucide React
- Fonts by Google Fonts (Inter)
- Energy data visualization concepts from various renewable energy platforms

## 📞 Support

For support and questions:
- Email: support@energyanvi.com
- GitHub Issues: [Create an issue](https://github.com/your-username/energy-anvi-website/issues)

---

**Energy Anvi** - Powering a Sustainable Future 🌱⚡