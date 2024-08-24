import { currentToken } from "./utils";
import { CancellationTokenSource, window, ProgressLocation, CancellationError } from "vscode";
import { makeSuggestion } from "../codeGeneration/generateSuggestion";
import { inlineProvider } from "./utils";
import { outputChannel } from "../utils";

// Cancel any ongoing suggestion generation
let currentCancellationTokenSource = currentToken();
let inlineCompletionProvider = inlineProvider();

async function editor() {

    if (currentCancellationTokenSource) {
        currentCancellationTokenSource.cancel();
    }

    // Create a new CancellationTokenSource for this invocation
    currentCancellationTokenSource = new CancellationTokenSource();

    // Get the current editor completely
    // Get the active text editor
    const editor = window.activeTextEditor;
    if (!editor) {
        window.showErrorMessage('No active text editor found');
        return;
    }

    // Get the entire content of the editor
    const document = editor.document;
    const entireContent = document.getText();

    try {
        let output = await window.withProgress(
            {
                location: ProgressLocation.Notification,
                title: 'Hang Tight Generating Suggestion...',
                cancellable: true,
            },
            async (progress, token) => {
                // Link the progress cancellation to our CancellationTokenSource
                currentCancellationTokenSource!.token.onCancellationRequested(() => token.isCancellationRequested = true);
                return await makeSuggestion(token, entireContent);
            }
        );

        if (!currentCancellationTokenSource.token.isCancellationRequested) {
            inlineCompletionProvider.triggerCompletion(output);
        }
    } catch (error) {
        if (error instanceof CancellationError) {
            outputChannel.appendLine('Suggestion generation was cancelled');
        } else {
            outputChannel.appendLine('An error occurred during suggestion generation:' + error);
        }
    } finally {
        currentCancellationTokenSource = null;
    }
}


export { editor, inlineCompletionProvider };