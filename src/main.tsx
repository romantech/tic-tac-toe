import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { Analytics } from '@vercel/analytics/react';

import App from '@/app';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <Analytics />
    <App />
  </StrictMode>,
);
