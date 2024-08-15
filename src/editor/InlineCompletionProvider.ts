import * as vscode from 'vscode';
import { Range } from 'vscode';

export class InlineCompletionProvider implements vscode.InlineCompletionItemProvider {
    async provideInlineCompletionItems(document: vscode.TextDocument, position: vscode.Position, context: vscode.InlineCompletionContext, token: vscode.CancellationToken): Promise<vscode.InlineCompletionList> {
        console.log('provideInlineCompletionItems triggered');

        const result: vscode.InlineCompletionList = {
            items: [],
            commands: [],
        };

        // Always add "Here is the output" as an inline completion item
        const snippet = new vscode.SnippetString("Here is the output");
        result.items.push({
            insertText: snippet,
            range: new Range(position.line, position.character, position.line, position.character),
            completeBracketPairs: false,
        });

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