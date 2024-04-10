export enum NotificationType {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Info = 'info',
}

export interface Notification {
  id: string
  message: string
  type: NotificationType
  timeout?: number
}

export interface NotificationsState {
  notifications: Notification[];
}