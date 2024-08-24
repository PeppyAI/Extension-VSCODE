import { LeftPanelWebview } from "../providers/left-webview-provider";
import { EXTENSION_CONSTANT } from "../constant";
import { window } from "vscode";


export function leftPanel(context) {
    const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, {});
    const view = window.registerWebviewViewProvider(
        EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
        leftPanelWebViewProvider,
    );
    return view;
}