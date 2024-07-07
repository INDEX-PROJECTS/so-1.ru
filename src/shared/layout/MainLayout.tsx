/* eslint-disable ulbi-tv-plugin/layer-imports */
import {
    memo, ReactElement,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './MainLayout.module.scss';
import { Notifications } from '@/features/Notifications';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const {
        className, content, header,
    } = props;

    return (
        <div className={classNames(styles.MainLayout, {}, [className])}>
            {header}

            {content}

            <Notifications />

        </div>
    );
});
