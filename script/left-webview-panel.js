document.addEventListener('DOMContentLoaded', function () {
    const vscode = acquireVsCodeApi();
    const serverUrlInput = document.getElementById('serverUrl');
    const portNumberInput = document.getElementById('portNumber');
    const modelProvider = document.getElementById('modelSelect');
    function updateSettings() {
        vscode.postMessage({
            action: 'UPDATE_SETTINGS',
            data: {
                serverUrl: serverUrlInput.value,
                portNumber: portNumberInput.value,
                modelProvider: modelProvider.value
            }
        });
    }

    serverUrlInput?.addEventListener('change', updateSettings);
    portNumberInput?.addEventListener('change', updateSettings);
});
