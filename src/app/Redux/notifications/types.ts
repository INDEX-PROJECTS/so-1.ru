export interface INotification {
  id: string;
  text: string;
  onClose?: () => void;
}

export interface NotificationsSchema {
  notifications: INotification[];
  autoHideDuration: number;
}
