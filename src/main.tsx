import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initTheme } from './context/ThemeContext';
import App from './App';
import './styles/variables.css';
import './styles/game-thumb-luxe.css';

initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
