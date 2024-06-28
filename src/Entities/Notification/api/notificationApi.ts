import { rtkApi } from "@/Shared/API/rtkApi";
import { Notification } from "../Model/types/notification";

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], null>({
      query: () => ({
        url: "/notifications",
      }),
    }),
  }),
});
export const useNotifications = notificationApi.useGetNotificationsQuery;
