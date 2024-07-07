import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NotificationItem.module.scss';
import { useAppDispatch } from '@/app/Redux/store';
import { dismissNotification } from '@/app/Redux/notifications/slice';
import { INotification } from '@/app/Redux/notifications/types';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { ReactComponent as CloseIcon } from '@/shared/assets/icons/close-icon.svg';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/Text';

interface NotificationItemProps {
  className?: string;
  notification: INotification;
}

export const NotificationItem = memo(({ className, notification }: NotificationItemProps) => {
    const dispatch = useAppDispatch();

    const [isClosing, setIsClosing] = useState(() => false);

    const [isProgress, setIsProgress] = useState(() => true);

    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const closeNotification = () => {
        setIsClosing(true);

        const timeoutUnmountNotification = setTimeout(() => {
            dispatch(dismissNotification(notification.id));

            setIsClosing(false);
        }, 1000);

        return () => clearTimeout(timeoutUnmountNotification);
    };

    const handleMouseLeave = useCallback(() => {
        setIsProgress(true);

        const timeoutId = setTimeout(() => {
            setIsClosing(true);

            const timeoutUnmountNotification = setTimeout(() => {
                dispatch(dismissNotification(notification.id));

                setIsClosing(false);
            }, 1000);

            return () => clearTimeout(timeoutUnmountNotification);
        }, 3000);

        setTimer(timeoutId);
    }, [dispatch, notification.id]);

    const handleMouseEnter = useCallback(() => {
        if (timer) {
            clearTimeout(timer);
            setIsProgress(false);
        }
    }, [timer]);

    useEffect(() => {
        handleMouseLeave();
    }, [handleMouseLeave]);

    useEffect(() => () => {
        if (timer) {
            clearTimeout(timer);
        }
    }, [timer]);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={classNames(styles.NotificationItem, { [styles.hide]: isClosing }, [className])}
        >

            <HStack gap="16" max justify="between">
                <Text textPrimary size={TextSize.L} text={notification.text} gap="0" />

                <Button onClick={closeNotification} className={styles.closeBtn} theme={ThemeButton.CLEAR}>
                    <CloseIcon className={styles.icon} />
                </Button>

            </HStack>

            <div
                className={styles.progressBar}
            >
                <div className={classNames(styles.progress, { [styles.start]: isProgress }, [])} />
            </div>

        </div>
    );
});
