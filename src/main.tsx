
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import App from './App.tsx'
import { AuthProvider } from '@/hooks/useAuth'
import { CartProvider } from '@/contexts/CartContext'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
