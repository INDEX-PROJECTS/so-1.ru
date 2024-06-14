import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@/app/styles/index.scss';
import { ErrorBoundary } from './app/providers/ErrorBoundary/index.ts';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать реакт приложение');
}

const root = createRoot(container);

root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
);
