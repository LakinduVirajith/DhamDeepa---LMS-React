import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'sonner';

const PUBLISHER_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHER_KEY) {
  throw new Error(
    'Clerk publishable key is not defined in environment variables',
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHER_KEY}
        afterSignOutUrl="/"
        signInForceRedirectUrl="/"
        signUpForceRedirectUrl="/about"
      >
        <App />
        <Toaster />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);
