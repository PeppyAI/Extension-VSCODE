import * as vscode from "vscode";
import { EXTENSION_CONSTANT } from "./constant";
import { LeftPanelWebview } from "./providers/left-webview-provider";
import { ProgressLocation, window, CancellationTokenSource } from "vscode";
import { makeSuggestion } from "./codeGeneration/generateSuggestion";
import { InlineCompletionProvider } from './editor/InlineCompletionProvider';
import { logger } from './utils';

export function activate(context: vscode.ExtensionContext) {
	const inlineCompletionProvider = new InlineCompletionProvider();
	let currentCancellationTokenSource: CancellationTokenSource | null = null;

	const disposable = vscode.commands.registerCommand('codegen.helloWorld', async function () {
		// Cancel any ongoing suggestion generation
		if (currentCancellationTokenSource) {
			currentCancellationTokenSource.cancel();
		}

		// Create a new CancellationTokenSource for this invocation
		currentCancellationTokenSource = new CancellationTokenSource();

		// Get the current editor completely
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active text editor found');
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
			if (error instanceof vscode.CancellationError) {
				console.log('Suggestion generation was cancelled');
			} else {
				console.error('An error occurred during suggestion generation:', error);
			}
		} finally {
			currentCancellationTokenSource = null;
		}
	});

	context.subscriptions.push(disposable);

	// Register view
	const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, {});
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
		leftPanelWebViewProvider,
	);
	context.subscriptions.push(view);

	// Register inline completion provider
	vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, inlineCompletionProvider);
}

export function deactivate() { }