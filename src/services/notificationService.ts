import api from './api';



import { SendNotificationRequest } from '../interfaces/sendNotificationRequestInterface';
import { NotificationUpdateRequest } from '../interfaces/notificationUpdateRequestInterface';

export const sendNotification = async (request: SendNotificationRequest) => {
    const response = await api.post(`/notifications/send`, request);
    return response.data;
};

export const getNotificationsForUser = async (cpf: string) => {
    const response = await api.get(`/notifications/user`, { params: { cpf } });
    return response.data;
};

export const updateNotificationReadStatus = async (request: NotificationUpdateRequest) => {
    await api.post(`/notifications/update`, request);
};
