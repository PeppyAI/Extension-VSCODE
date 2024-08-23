import * as vscode from 'vscode';
// import { postCompletion } from './anacondaAINavigator';
import { postCompletion } from './ollama';
import { logger } from '../utils';


export async function makeSuggestion(token: vscode.CancellationToken, content: string): Promise<string> {
    // Periodically check for cancellation
    if (token.isCancellationRequested) {
        throw new vscode.CancellationError();
    }
    // Generating the remaining code via Anaconda Navigator
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

    logger.info(context);
    logger.info(userprompt);
    return await postCompletion(context, userprompt);
}