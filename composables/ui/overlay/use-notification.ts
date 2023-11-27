export interface NotificationActions {
  iconLeft?: `lucide:${string}`;
  iconRight?: `lucide:${string}`;
  label: string;
  onClick: () => void;
}

export interface NotificationOptions {
  actions?: NotificationActions[];
  duration?: number;
  id?: string;
  message?: string;
  title: string;
  type?: 'error' | 'info' | 'success' | 'warning';
}

export const useNotification = () => {
  const notifications = useState<NotificationOptions[]>(() => []);

  const addNotification = (notification: NotificationOptions) => {
    notifications.value.push({
      ...notification,
      duration: notification.duration ?? 5_000,
      id: Date.now().toString(),
    });

    setTimeout(() => {
      removeNotification(notification);
    }, notification.duration ?? 5_000);
  };

  const removeNotification = (notification: NotificationOptions) => {
    const index = notifications.value.indexOf(notification);
    notifications.value.splice(index, 1);
  };

  return {
    addNotification,
    notifications,
    removeNotification,
  };
};

export default useNotification;
