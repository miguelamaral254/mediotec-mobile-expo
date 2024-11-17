import { Notification } from "../interfaces/notificationInterface";

export type RootDrawerParamList = {
  home: undefined;
  profile: undefined;
  drawerRoutes: undefined;
};

export type RootStackParamList = {
  NotificationList: undefined;
  NotificationDetails: { notification: Notification };
};