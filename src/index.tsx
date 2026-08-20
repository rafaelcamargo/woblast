import { createRoot } from 'react-dom/client';
import { App } from './app';

const container = document.querySelector('[data-app]');

if (container) {
  createRoot(container).render(<App />);
}
