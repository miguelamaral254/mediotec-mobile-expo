import api, { DEBUG_MODE } from "./api";
import { SendNotificationRequest } from "../interfaces/sendNotificationRequestInterface";
import { NotificationUpdateRequest } from "../interfaces/notificationUpdateRequestInterface";

export const sendNotification = async (request: SendNotificationRequest) => {
  if (DEBUG_MODE) {
    console.log("Enviando notificação com os dados:", request);
  }

  const response = await api.post(`/notifications/send`, request);

  if (DEBUG_MODE) {
    console.log("Resposta ao enviar notificação:", response.data);
  }

  return response.data;
};

export const getNotificationsForUser = async (cpf: string) => {
  if (DEBUG_MODE) {
    console.log(`Buscando notificações para o usuário com CPF: ${cpf}`);
  }

  const response = await api.get(`/notifications/user`, { params: { cpf } });

  if (DEBUG_MODE) {
    console.log("Notificações recebidas:", response.data);
  }

  return response.data;
};

export const updateNotificationReadStatus = async (
  request: NotificationUpdateRequest
) => {
  if (DEBUG_MODE) {
    console.log(
      "Atualizando status de leitura da notificação com os dados:",
      request
    );
  }

  await api.post(`/notifications/update`, request);

  if (DEBUG_MODE) {
    console.log("Status de leitura atualizado com sucesso.");
  }
};
