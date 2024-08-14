try {
	require("module-alias/register");
} catch (e) {
	console.log("module-alias import error !");
}

import * as vscode from "vscode";
import { EXTENSION_CONSTANT } from "constant";
import { LeftPanelWebview } from "providers/left-webview-provider";
import { ProgressLocation, window } from "vscode";
import { makeSuggestion } from "./codeGeneration/generateSuggestion";
import { InlineCompletionProvider } from './InlineCompletionProvider';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('codegen.helloWorld', async function () {
		let output = await window.withProgress(
			{
				location: ProgressLocation.Notification,
				title: 'Hang Tight Generating Suggestion...',
				cancellable: false,
			},
			async (progress, token) => await makeSuggestion()
		);
		console.log(output);
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
	const provider = new InlineCompletionProvider();
	vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, provider);
}

export function deactivate() { }