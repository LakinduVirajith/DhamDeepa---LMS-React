import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip.tsx';

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
        <TooltipProvider>
          <App />
        </TooltipProvider>
        <Toaster />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);
