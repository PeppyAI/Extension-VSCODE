import axios from 'axios';
import { logger, outputChannel } from "../utils";

export async function getServerHealthAnaconda(url) {
    try {
        const response = await axios.get(`${url}/health`);
        if (response.status === 200) {
            logger.info("API Health is OK");
        }
        return response.data;
    } catch (error) {
        logger.error('Error fetching server health:', error);
        throw error;
    }
}


export async function postCompletionAnaconda(context, userInput, url) {
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
        const response = await axios.post(`${url}/completion`, data, { headers: headers });
        if (response.status === 200) {
            return response.data.content.trim();
        } else {
            return "Error processing your request. Please try again.";
        }
    } catch (error) {
        return "Error processing your request. Please try again.";
    }
}