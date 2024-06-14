import { Suspense } from 'react';
import { classNames } from './shared/lib/classNames/classNames';
import { MainLayout } from './shared/layout/MainLayout';
import { Navbar } from './widgets/Navbar';
import { MainPage } from './pages/MainPage';

function App() {
    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar />}
                    content={<MainPage />}
                />
            </Suspense>
        </div>
    );
}

export default App;
