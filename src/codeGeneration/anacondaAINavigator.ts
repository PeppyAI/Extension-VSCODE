import { ANACONDA_BASE_URL } from "../constant";
import axios from 'axios';

export async function getServerHealth() {
    try {
        const response = await axios.get(`${ANACONDA_BASE_URL}/health`);
        if (response.status === 200) {
            console.log("API Health is OK")
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching server health:', error);
        throw error;
    }
}


export async function postCompletion(context, userInput) {
    const prompt = `${context}\nUser: ${userInput}\nAssistant:`;
    // const prompt = context;
    const data = {
        prompt: prompt,
        temperature: 0.1,
        top_k: 5,
        top_p: 0.95,
        n_predict: 400,
        stop: ["</s>", "Assistant:", "User:"]
    };
    const headers = { 'Content-Type': 'application/json' };

    try {
        const response = await axios.post(`${ANACONDA_BASE_URL}/completion`, data, { headers: headers });
        if (response.status === 200) {
            console.log(response.data.content);
            return response.data.content.trim();
        } else {
            return "Error processing your request. Please try again.";
        }
    } catch (error) {
        return "Error processing your request. Please try again.";
    }
}