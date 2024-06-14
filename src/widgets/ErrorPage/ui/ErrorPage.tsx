import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ErrorPage.module.scss';

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(styles.ErrorPage, {}, [className])}>
            <p>Ошибка</p>
            <button type="button" onClick={reloadPage}>
                Обновить страницу
            </button>
        </div>
    );
};
