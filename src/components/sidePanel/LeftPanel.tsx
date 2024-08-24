import Button from './Button';

interface LeftPanelProp {
    message: string
}

function LeftPanel({
    message
}: LeftPanelProp) {
    return (
        <div className='panel-wrapper'>
            <span className='panel-info'>{message}</span>
            <div className="input-container">
                <label htmlFor="modelSelect">Select Model:</label>
                <select id="modelSelect" className="vscode-select">
                    <option value="anaconda">Anaconda</option>
                    <option value="ollama">Ollama</option>
                </select>
            </div>
            <div className="input-container">
                <label htmlFor="serverUrl">Server URL:</label>
                <input type="text" id="serverUrl" defaultValue="http://localhost" />
            </div>
            <div className="input-container">
                <label htmlFor="portNumber">Port Number:</label>
                <input type="number" id="portNumber" defaultValue="8080" />
            </div>
            <Button></Button>
        </div>
    );
}

export default LeftPanel;