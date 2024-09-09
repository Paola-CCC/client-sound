import { httpClient } from "../httpClient";

const addConversation = async (data) => {
    try {
        const response = await httpClient.post(`/new-conversation`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const getAllConversationForProfessor = async (data) => {
    try {
        const response = await httpClient.post(`/conversation-professor`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const getAllConversationForStudent = async (data) => {
    try {
        const response = await httpClient.post(`/conversation-student`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const showAll = async () => {
    try {
        const response = await httpClient.get(`/all-conversations`);
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const show = async (conversationId) => {
    try {
        const response = await httpClient.get(`/conversation/${conversationId}`);
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteConversation = async (conversationId) => {
    try {
        const response = await httpClient.delete(`/delete-conversation/${conversationId}`);
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            console.log('error message', response);
        }
    } catch (error) {
        console.error(error);
    }
};

const conversationService = {
    addConversation,
    getAllConversationForProfessor,
    getAllConversationForStudent,
    showAll,
    show,
    deleteConversation
};

export default conversationService;