import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* HTML and Body */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.default};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    }
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
    }
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
    }
  }

  /* Lists */
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Form Elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${({ theme }) => theme.colors.grey[300]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.disabled};
    }
  }

  /* Layout */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0 ${({ theme }) => theme.spacing.xl};
    }
  }

  .container-fluid {
    width: 100%;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }
  }

  /* Utility Classes */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .d-flex { display: flex; }
  .d-block { display: block; }
  .d-inline-block { display: inline-block; }
  .d-none { display: none; }

  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .justify-around { justify-content: space-around; }
  .justify-start { justify-content: flex-start; }
  .justify-end { justify-content: flex-end; }

  .align-center { align-items: center; }
  .align-start { align-items: flex-start; }
  .align-end { align-items: flex-end; }

  .flex-column { flex-direction: column; }
  .flex-row { flex-direction: row; }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: ${({ theme }) => theme.spacing.xs}; }
  .mb-2 { margin-bottom: ${({ theme }) => theme.spacing.sm}; }
  .mb-3 { margin-bottom: ${({ theme }) => theme.spacing.md}; }
  .mb-4 { margin-bottom: ${({ theme }) => theme.spacing.lg}; }
  .mb-5 { margin-bottom: ${({ theme }) => theme.spacing.xl}; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: ${({ theme }) => theme.spacing.xs}; }
  .mt-2 { margin-top: ${({ theme }) => theme.spacing.sm}; }
  .mt-3 { margin-top: ${({ theme }) => theme.spacing.md}; }
  .mt-4 { margin-top: ${({ theme }) => theme.spacing.lg}; }
  .mt-5 { margin-top: ${({ theme }) => theme.spacing.xl}; }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }

  .slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey[400]};
    border-radius: ${({ theme }) => theme.borderRadius.full};

    &:hover {
      background: ${({ theme }) => theme.colors.grey[500]};
    }
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.contrastText};
  }

  /* Focus Visible */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  /* Loading States */
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }

  .skeleton {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.grey[200]} 25%,
      ${({ theme }) => theme.colors.grey[100]} 50%,
      ${({ theme }) => theme.colors.grey[200]} 75%
    );
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Print Styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a, a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }

    abbr[title]:after {
      content: " (" attr(title) ")";
    }

    .no-print {
      display: none !important;
    }
  }

  /* High Contrast Mode */
  @media (prefers-contrast: high) {
    button, input, select, textarea {
      border: 2px solid;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;