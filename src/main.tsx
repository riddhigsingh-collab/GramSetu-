import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register service worker for offline resilience
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((err) => {
        // Fallback for strict sandbox iframe environments
        console.info('ServiceWorker notice:', err.message);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
