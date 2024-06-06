import { createRoot } from 'react-dom/client';

export function getCleanTestingRoot() {
  const node = document.getElementById('root');

  return createRoot(node);
}
