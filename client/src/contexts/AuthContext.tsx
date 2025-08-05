import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  company?: string;
  position?: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
  position?: string;
  phone?: string;
}

// Action Types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial State
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: false,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API Base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set token in axios headers
  useEffect(() => {
    if (state.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      localStorage.setItem('token', state.token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [state.token]);

  // Check if user is authenticated on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await api.get('/auth/me');
          
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: response.data.user,
              token,
            },
          });
        } catch (error) {
          console.error('Auth check failed:', error);
          dispatch({ type: 'AUTH_FAILURE' });
          localStorage.removeItem('token');
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await api.post('/auth/login', { email, password });
      
      const { user, token } = response.data;
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token },
      });
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE' });
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await api.post('/auth/register', userData);
      
      const { user, token } = response.data;
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token },
      });
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE' });
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    }
  };

  // Logout function
  const logout = (): void => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      const response = await api.put('/auth/profile', userData);
      
      dispatch({
        type: 'UPDATE_USER',
        payload: response.data.user,
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Profile update failed';
      throw new Error(message);
    }
  };

  // Update password function
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await api.put('/auth/password', { currentPassword, newPassword });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Password update failed';
      throw new Error(message);
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the API instance for use in other parts of the app
export { api };

export default AuthContext;