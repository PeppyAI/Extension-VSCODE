import * as vscode from 'vscode';
import { Range } from 'vscode';

export class InlineCompletionProvider implements vscode.InlineCompletionItemProvider {
    private suggestion: string | null = null;

    triggerCompletion(suggestion: string) {
        this.suggestion = suggestion;
        vscode.commands.executeCommand('editor.action.inlineSuggest.trigger');
    }

    async provideInlineCompletionItems(document: vscode.TextDocument, position: vscode.Position, context: vscode.InlineCompletionContext, token: vscode.CancellationToken): Promise<vscode.InlineCompletionList> {
        console.log('provideInlineCompletionItems triggered');
        const result: vscode.InlineCompletionList = {
            items: [],
            commands: [],
        };

        if (this.suggestion) {
            const snippet = new vscode.SnippetString(this.suggestion);
            result.items.push({
                insertText: snippet,
                range: new Range(position.line, position.character, position.line, position.character),
                completeBracketPairs: false,
            });

            // Reset the suggestion after providing it
            this.suggestion = null;
        }

        if (result.items.length > 0) {
            result.commands!.push({
                command: 'demo-ext.command1',
                title: 'My Inline Completion Demo Command',
                arguments: [1, 2],
            });
        }

        return result;
    }

    handleDidShowCompletionItem(completionItem: vscode.InlineCompletionItem): void {
        console.log('handleDidShowCompletionItem');
    }

    handleDidPartiallyAcceptCompletionItem(completionItem: vscode.InlineCompletionItem, info: vscode.PartialAcceptInfo | number): void {
        console.log('handleDidPartiallyAcceptCompletionItem', completionItem, info);
    }
}