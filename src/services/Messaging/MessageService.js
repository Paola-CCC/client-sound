import { httpClient } from "../httpClient";

const showAll = async () => {
    try {
        const response = await httpClient.get(`/all-messages`);
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const show = async (messageId) => {
    try {
        const response = await httpClient.get(`/message/${messageId}`);
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const addMessage = async (data) => {
    try {
        const response = await httpClient.post(`/new-message`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteMessage = async (messageId) => {
    try {
        const response = await httpClient.delete(`/delete-message/${messageId}`);
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

export const MessageService = {
    showAll,
    show,
    addMessage,
    deleteMessage
};

export default MessageService;