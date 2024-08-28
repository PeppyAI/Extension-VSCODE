document.addEventListener('DOMContentLoaded', function () {
    document.getElementById(ELEMENT_IDS.TRIGGER_COMPLETION_BUTTON).addEventListener('click', () => {
        vscode.postMessage({ action: 'TRIGGER_CODE_COMPLETION' });
    });
});