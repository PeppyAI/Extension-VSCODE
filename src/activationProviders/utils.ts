import { CancellationTokenSource } from "vscode";
import { InlineCompletionProvider } from "../editor/InlineCompletionProvider";

export function currentToken() {
    let currentCancellationTokenSource: CancellationTokenSource | null = null;
    return currentCancellationTokenSource;
}

export function inlineProvider() {
    const inlineCompletionProvider = new InlineCompletionProvider();
    return inlineCompletionProvider;
}