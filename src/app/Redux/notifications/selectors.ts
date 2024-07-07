import { RootState } from '../store';

export const selectNotifications = (state: RootState) => state.notification.notifications;

export const selectNotificationDuration = (state: RootState) => state.notification.autoHideDuration;
