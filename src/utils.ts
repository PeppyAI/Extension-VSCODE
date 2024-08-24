import * as winston from 'winston';
import { window } from "vscode";

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const Utils = {
    getNonce,
};

// Configuring the logging via winston
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

// Configuring the messages to Seperate Output Channel

export const outputChannel = window.createOutputChannel("Peppy AI");