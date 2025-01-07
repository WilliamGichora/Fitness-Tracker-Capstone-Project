import axios from 'axios';

//This is the base api url, with a set timeout
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

//Fetch Exercise Function
export const fetchExercises = async ({ pageParam ="https://wger.de/api/v2/exercise/?limit=60&offset=0" }) => {
    const url = pageParam ?? "/exercise/?limit=20";
    const response = await apiClient.get(url);
    return response.data;
};

//Fetch Individual Exercise Info
export const fetchExerciseByID = async (id) => {
    const response = await apiClient.get(`/exerciseinfo/${id}`);
    return response.data;
}




