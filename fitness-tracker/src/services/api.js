import axios from 'axios';

//This is the base api url
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

//Fetch Exercise Function. Implements Pagination
export const fetchExercises = async ({ pageParam = "https://wger.de/api/v2/exercise/?limit=60&offset=0" }) => {
    const url = pageParam ?? "/exercise/?limit=20";
    const response = await apiClient.get(url);
    return response.data;
};

//Fetch Individual Exercise Info
export const fetchExerciseByCategoryID = async (id) => {
    const response = await apiClient.get(`/exercise/?category=${id}`);
    return response.data;
}

//Fetch Exercise Categories
export const fetchExerciseCategory = async () => {
    const response = await apiClient.get(`/exercisecategory`);
    return response.data
}

//fetch languages
export const fetchLanguage = async (id) => {
    const response = await apiClient.get(`/language/${id}`);
    return response.data;
}

//Search exercise from api
export const searchExerciseByName =async (language,term) => {
    const response = await apiClient.get(`/exercise/search/?language=${language}&term=${term}`);
    return response.data;
}




