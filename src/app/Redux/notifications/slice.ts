import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { INotification, NotificationsSchema } from './types';

const initialState: NotificationsSchema = {
    notifications: [],
    autoHideDuration: 3000,
};

export const NotificationsSlice = createSlice({
    name: 'Notifications',
    initialState,
    reducers: {
        addNotification: (
            state,
            { payload }: PayloadAction<Omit<INotification, 'id'>>,
        ) => {
            const notification: INotification = {
                id: nanoid(),
                ...payload,
            };

            state.notifications.push(notification);
        },
        dismissNotification: (
            state,
            { payload }: PayloadAction<INotification['id']>,
        ) => {
            const index = state.notifications.findIndex(
                (notification) => notification.id === payload,
            );

            if (index !== -1) {
                state.notifications.splice(index, 1);
            }
        },
        setNotificationDuration: (
            state,
            { payload }: PayloadAction<NotificationsSchema['autoHideDuration']>,
        ) => {
            state.autoHideDuration = payload;
        },
    },

});

export const { addNotification, dismissNotification } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
