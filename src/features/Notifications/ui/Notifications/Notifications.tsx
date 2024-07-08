import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectNotifications } from '@/app/Redux/notifications/selectors';
import { NotificationList } from '../NotificationList/NotificationList';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationsProps {
  className?: string;
}

export const Notifications = memo(({ className }: NotificationsProps) => {
    const notifications = useSelector(selectNotifications);
    return (
        <NotificationList className={className}>
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </NotificationList>
    );
});
