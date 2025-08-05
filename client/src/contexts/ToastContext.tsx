import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Types
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

interface ToastState {
  toasts: Toast[];
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

// Action Types
type ToastAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'CLEAR_TOASTS' };

// Initial State
const initialState: ToastState = {
  toasts: [],
};

// Reducer
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload),
      };
    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: [],
      };
    default:
      return state;
  }
};

// Create Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Styled Components
const ToastContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 400px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    max-width: none;
  }
`;

const ToastItem = styled(motion.div)<{ $type: Toast['type'] }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-left: 4px solid ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return theme.colors.success.main;
      case 'error':
        return theme.colors.error.main;
      case 'warning':
        return theme.colors.warning.main;
      case 'info':
        return theme.colors.info.main;
      default:
        return theme.colors.grey[300];
    }
  }};
`;

const ToastIcon = styled.div<{ $type: Toast['type'] }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return theme.colors.success.main;
      case 'error':
        return theme.colors.error.main;
      case 'warning':
        return theme.colors.warning.main;
      case 'info':
        return theme.colors.info.main;
      default:
        return theme.colors.grey[500];
    }
  }};
`;

const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToastTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const ToastMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.disabled};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.grey[100]};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

// Toast Item Component
const ToastItemComponent: React.FC<{
  toast: Toast;
  onRemove: (id: string) => void;
}> = ({ toast, onRemove }) => {
  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  // Auto remove toast after duration
  React.useEffect(() => {
    if (!toast.persistent && toast.duration !== 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, toast.persistent, onRemove]);

  return (
    <ToastItem
      $type={toast.type}
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <ToastIcon $type={toast.type}>
        {getIcon(toast.type)}
      </ToastIcon>
      
      <ToastContent>
        <ToastTitle>{toast.title}</ToastTitle>
        {toast.message && <ToastMessage>{toast.message}</ToastMessage>}
      </ToastContent>
      
      <CloseButton
        onClick={() => onRemove(toast.id)}
        aria-label="Close notification"
      >
        <X size={16} />
      </CloseButton>
    </ToastItem>
  );
};

// Toast Provider Component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const showToast = (toast: Omit<Toast, 'id'>): void => {
    const id = generateId();
    dispatch({
      type: 'ADD_TOAST',
      payload: { ...toast, id },
    });
  };

  const removeToast = (id: string): void => {
    dispatch({
      type: 'REMOVE_TOAST',
      payload: id,
    });
  };

  const clearToasts = (): void => {
    dispatch({ type: 'CLEAR_TOASTS' });
  };

  const value: ToastContextType = {
    showToast,
    removeToast,
    clearToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer>
        <AnimatePresence mode="popLayout">
          {state.toasts.map((toast) => (
            <ToastItemComponent
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
            />
          ))}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

// Custom hook to use toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Convenience hooks for different toast types
export const useToastHelpers = () => {
  const { showToast } = useToast();

  return {
    showSuccess: (title: string, message?: string, options?: Partial<Toast>) =>
      showToast({ type: 'success', title, message, ...options }),
    
    showError: (title: string, message?: string, options?: Partial<Toast>) =>
      showToast({ type: 'error', title, message, ...options }),
    
    showWarning: (title: string, message?: string, options?: Partial<Toast>) =>
      showToast({ type: 'warning', title, message, ...options }),
    
    showInfo: (title: string, message?: string, options?: Partial<Toast>) =>
      showToast({ type: 'info', title, message, ...options }),
  };
};

export default ToastContext;