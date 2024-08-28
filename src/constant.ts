const LEFT_PANEL_WEBVIEW_ID = 'left-panel-webview';

const ELEMENT_IDS = {
    TRIGGER_COMPLETION_BUTTON: 'trigger-completion-button'
};

export const EXTENSION_CONSTANT = {
    LEFT_PANEL_WEBVIEW_ID,
    ELEMENT_IDS
};

// Class to hold the values for extension host and port number
class ApiDetails {
    private static instance: ApiDetails;
    private ip: string = "http://localhost";
    private port: string = "8080";
    private provider: string = "anaconda";

    private constructor() { }

    public static getInstance(): ApiDetails {
        if (!ApiDetails.instance) {
            ApiDetails.instance = new ApiDetails();
        }
        return ApiDetails.instance;
    }

    public setIP(ip: string): void {
        this.ip = ip;
    }
    public setPort(port: string): void {
        this.port = port;
    }
    public setProvider(provider: string): void {
        this.provider = provider;
    }
    public getIP(): string {
        return this.ip;
    }
    public getPort(): string {
        return this.port;
    }
    public getProvider(): string {
        return this.provider;
    }
}

export const apiDetails = ApiDetails.getInstance();
