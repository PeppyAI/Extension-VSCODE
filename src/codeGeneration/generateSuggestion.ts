import * as vscode from 'vscode';
import { postCompletionAnaconda } from './anacondaAINavigator';
import { postCompletionOllama } from './ollama';
import { apiDetails } from "../constant";
import { outputChannel } from '../utils';


export async function makeSuggestion(token: vscode.CancellationToken, content: string): Promise<string> {
    // Periodically check for cancellation
    if (token.isCancellationRequested) {
        throw new vscode.CancellationError();
    }
    // Getting the comment line out of the same
    let context = null;
    let userprompt = null;
    if (content.lastIndexOf("\n") > 0) {
        context = content.substring(0, content.lastIndexOf("\n"));
        userprompt = content.substring(content.lastIndexOf("\n"));
    } else {
        context = content;
        userprompt = "";
    }

    let provider = apiDetails.getProvider();
    let url = apiDetails.getIP() + ":" + apiDetails.getPort();

    if (provider === "ollama") {
        outputChannel.appendLine("Ollama is called");
        return await postCompletionOllama(context, userprompt, url);
    }
    else if (provider === "anaconda") {
        outputChannel.appendLine("Anaconda is called");
        return await postCompletionAnaconda(context, userprompt, url);
    }
}