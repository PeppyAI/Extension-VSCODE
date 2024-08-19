import { OLLAMA_BASE_URL } from "../constant";
import axios from 'axios';
import { logger } from '../utils';

export async function postCompletion(context, userInput) {
    const prompt = `${context}\n${userInput}\n`;
    const data = {
        "prompt": prompt,
        "model": "codellama:code",
        "options": {
            "temperature": 0,
            "top_k": 1,
            "top_p": 0.95,
            "num_predict": 400,
        },
        "suffix": "    return result",
        "stream": false
    };
    const headers = { 'Content-Type': 'application/json' };

    try {
        logger.info("Triggering the post request")
        const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, data, { headers: headers });
        if (response.status === 200) {
            // logger.info(response.data.response)
            return response.data.response;
        } else {
            return "Error processing your request. Please try again.";
        }
    } catch (error) {
        logger.error(error);
        return "Error processing your request. Please try again.";
    }
}
