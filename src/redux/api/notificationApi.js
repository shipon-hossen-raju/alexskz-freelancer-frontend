
import { baseApi } from '../api/baseApi.js';



const notificationApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

    
    //get all categories
    getAllNotifications: builder.query({
        query: () => ({
            url: 'notifications/me',
            method: 'GET',
        })
    }),

        
}),
});

export const {
    useGetAllNotificationsQuery,
} = notificationApi;

// Backwards-compatible alias (some pages import the singular name)
export const useGetAllNotificationQuery = notificationApi.useGetAllNotificationsQuery;
