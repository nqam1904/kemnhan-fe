// notify
type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacementType = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type NotifyState = {
  type: NotificationType;
  message?: string;
  description?: string;
  duration?: number;
  placement?: NotificationPlacementType;
};
