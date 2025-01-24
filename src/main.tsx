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

function setFavicon() {
    let favicon = '/favicon.svg';

    if (import.meta.env.VITE_DOMEN_NAME === 'pro-zapchasti.online') {
        favicon = '/favicon2.svg';
    }

    const link: HTMLLinkElement = document.querySelector("link[rel='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = favicon;

    if (!link.parentNode) {
        document.head.appendChild(link);
    }
}

// Вызов функции смены фавикона
setFavicon();

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
);
