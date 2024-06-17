import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './App.tsx';
import '@/app/styles/index.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { ErrorBoundary } from './app/providers/ErrorBoundary/index.ts';

import { store } from '@/app/Redux/store.ts';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать реакт приложение');
}

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
);
