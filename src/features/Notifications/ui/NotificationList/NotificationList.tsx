import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
  children: ReactNode
}

export const NotificationList = memo(({ className, children }: NotificationListProps) => (
    <div className={classNames(styles.NotificationList, {}, [className])}>
        {children}
    </div>
));
