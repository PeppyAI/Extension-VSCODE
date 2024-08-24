import * as vscode from "vscode";
import { editor, inlineCompletionProvider } from "./activationProviders/editor";
import { leftPanel } from "./activationProviders/leftPanel";

export function activate(context: vscode.ExtensionContext) {
	// Pushing commands into subscriptions
	context.subscriptions.push(vscode.commands.registerCommand('Peppy.shortcut', editor));
	context.subscriptions.push(leftPanel(context));
	// Register inline completion provider
	vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, inlineCompletionProvider);
}

export function deactivate() { }