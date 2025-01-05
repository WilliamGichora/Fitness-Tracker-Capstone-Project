import axios from 'axios';

//This is the base api url, with a set timeout
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
});

//Fetch Exercise Function
export const fetchExercises = async () => {
    const response = await apiClient.get('/exercise');
    return response.data;
};

//Fetch Individual Exercise Info
export const fetchExerciseByID = async (id) => {
    const response = await apiClient.get(`/exerciseinfo/${id}`);
    return response.data;
}




