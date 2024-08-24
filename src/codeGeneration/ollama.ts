import axios from 'axios';

export async function postCompletionOllama(context, userInput, url) {
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
        const response = await axios.post(`${url}/api/generate`, data, { headers: headers });
        if (response.status === 200) {
            return response.data.response;
        } else {
            return "Error processing your request. Please try again.";
        }
    } catch (error) {
        return "Error processing your request. Please try again.";
    }
}
