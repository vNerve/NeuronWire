import {vNerve} from "../types/vNerveTransmitter/vNerve";

/**
 * Client Interface, all Client should should implement this interface.
 * @internal
 */
export interface IClient {
    serverURL: string;
    username: string;
    password: string;
    retryTime: number;
    heartbeatIn: number;
    heartbeatOut: number;
    presetServer: number;
    isDebugEnabled: boolean;

    onConnect(cb: unknown): void;

    onError(cb: unknown): void;

    onWebSocketClose(cb: unknown): void;

    activate(): void;

    deactivate (): void;

    subscribe(channel: string, cb: unknown): void;
}

export declare type clientCallback = (message: unknown) => void;

