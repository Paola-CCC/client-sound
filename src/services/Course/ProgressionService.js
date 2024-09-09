import {httpClient} from "../httpClient";


export const addProgression = async (data) =>
{
    try {
        const response = await httpClient.post(`/new-progression`,data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data ;
        } else {
            console.log('error message ', response)
        }
    } catch (error) {
        console.error(error)
    }
}

export const getAllProgressionForProfessor = async (data) =>
{
    try {
        const response = await httpClient.post(`/progression-prof`,data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data ;
        } else {
            console.log('error message ', response)
        }
    } catch (error) {
        console.error(error)
    }
}

export const searchProgressionStudent = async (data) =>
{
    try {
        const response = await httpClient.post(`/progression/student/search`,data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data ;
        } else {
            console.log('error message ', response)
        }
    } catch (error) {
        console.error(error)
    }
}

export const updateOneProgression = async (data) =>
{
    try {
        const response = await httpClient.put(`/update-progression`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data ;
        } else {
            console.log('error message ', response)
        }
    } catch (error) {
        console.error(error)
    }
}


export const showAll = async () =>
{
    try {
        const response = await httpClient.get(`/all-progression`);
        if (response.status >= 200 && response.status <= 299) {
            return response.data ;
        } else {
            console.log('error message ', response)
        }
    } catch (error) {
        console.error(error)
    }
}

    
export const show = async (progressionId) =>
{
    try {
        const response = await httpClient.get(`/progression/${progressionId}`);
        if (response.status >= 200 && response.status <= 299) {
            return response ;
        } else {
            console.log('error message ', response)
        }
    } catch (error) {
        console.error(error)
    }
}

export const deleteProgression = async (progressionId) =>
{
    try {
        const response = await httpClient.delete(`/delete-progression/${progressionId}`);
        if (response.status >= 200 && response.status <= 299) {
            return response.data ;
        } else {
            console.log('error message ', response)
        }
    } catch (error) {
        console.error(error)
    }
}


const ProgressionService = {
    addProgression,
    getAllProgressionForProfessor,
    searchProgressionStudent,
    updateOneProgression,
    showAll,
    show,
    deleteProgression
};

export default ProgressionService;