import { WebviewViewProvider, WebviewView, Webview, Uri, EventEmitter, window } from "vscode";
import { Utils } from "../utils";
import LeftPanel from '../components/sidePanel/LeftPanel';
import * as ReactDOMServer from "react-dom/server";
import { apiDetails } from "../constant";
import { commands } from "vscode";

export class LeftPanelWebview implements WebviewViewProvider {
	constructor(
		private readonly extensionPath: Uri,
		private data: any,
		private _view: any = null
	) { }
	private onDidChangeTreeData: EventEmitter<any | undefined | null | void> = new EventEmitter<any | undefined | null | void>();

	refresh(context: any): void {
		this.onDidChangeTreeData.fire(null);
		this._view.webview.html = this._getHtmlForWebview(this._view?.webview);
	}

	//called when a view first becomes visible
	resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this.extensionPath],
		};
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
		this._view = webviewView;
		this.activateMessageListener();
	}

	private activateMessageListener() {
		this._view.webview.onDidReceiveMessage((message) => {
			switch (message.action) {
				case 'SHOW_WARNING_LOG':
					window.showWarningMessage(message.data.message);
					break;
				case 'UPDATE_SETTINGS':
					// Handle the updated settings here
					apiDetails.setIP(message.data.serverUrl);
					apiDetails.setPort(message.data.portNumber);
					apiDetails.setProvider(message.data.modelProvider);
					break;
				case 'TRIGGER_CODE_COMPLETION':
					commands.executeCommand('Peppy.shortcut');
					break;
				default:
					break;
			}
		});
	}

	private _getHtmlForWebview(webview: Webview) {
		// Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
		const constantUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "script", "constants.js")
		);
		const jsUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "script", "left-webview-panel.js")
		);
		const completionButtonUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "script", "webview-completion-button.js")
		);
		// CSS file to handle styling
		const styleUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "script", "left-webview-provider.css")
		);
		// Use a nonce to only allow a specific script to be run.
		const nonce = Utils.getNonce();

		return `<html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta http-equiv="Content-Security-Policy" 
                            content="default-src 'none';
                            img-src vscode-resource: https:;
                            font-src ${webview.cspSource};
                            style-src ${webview.cspSource} 'unsafe-inline';
                            script-src 'nonce-${nonce}'
							
							;">             
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="${styleUri}" rel="stylesheet">

                </head>
                <body>
				
                    ${ReactDOMServer.renderToString((
			<LeftPanel message={"Welcome to PeppyAI"}></LeftPanel>
		))
			}
				</body>
				<script nonce="${nonce}" type="text/javascript" src="${constantUri}"></script>
				<script nonce="${nonce}" type="text/javascript" src="${jsUri}"></script>
				<script nonce="${nonce}" type="text/javascript" src="${completionButtonUri}"></script>
            </html>`;
	}
}
