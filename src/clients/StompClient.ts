import { ENDPOINT } from "../constants/ENDPOINT";
import { Client, Frame, messageCallbackType, StompSubscription } from "@stomp/stompjs";
import { IClient } from "./IClient";

/**
 * STOMP(WebSocket) Protocol Client.
 */
export default class StompClient implements IClient{
    serverURL = '';
    username = '';
    password = '';
    retryTime = 5000;
    heartbeatIn = 5000;
    heartbeatOut = 5000;
    presetServer = 0;
    isDebugEnabled = false;


    client: Client;

    /**
     * Stomp Client Constructor
     * @param config Client Config
     * @description This constructor will create an instance of STOMP.js Websocket Connection
     */
    constructor(config: {serverURL: string;
                username: string; password: string;
                retryTime: number;
                heartbeatIn: number;
                heartbeatOut: number;
                presetServer: 0 | 1; isDebugEnabled: boolean;}) {
      // important sever config
      config.serverURL === undefined ? this.serverURL = ENDPOINT[this.presetServer].protocol +
            '://' + ENDPOINT[this.presetServer].url : this.serverURL = config.serverURL;
      config.username === undefined ? this.username = ENDPOINT[this.presetServer].username
        : this.username = config.username;
      config.password === undefined ? this.password = this.password = ENDPOINT[this.presetServer].password
        : this.password = config.password;
      // misc config
      config.retryTime !== undefined ? this.retryTime = config.retryTime : null;
      config.heartbeatIn !== undefined ? this.heartbeatIn = config.heartbeatIn : null;
      config.heartbeatOut !== undefined ? this.heartbeatOut = config.heartbeatOut : null;
      config.presetServer !== undefined ? this.presetServer = config.presetServer : null;
      config.isDebugEnabled !== undefined ? this.isDebugEnabled = config.isDebugEnabled : null;

      this.client = new Client({
        brokerURL: this.serverURL,
        connectHeaders: {
          login: this.username,
          passcode: this.password
        },
        reconnectDelay: this.retryTime,
        heartbeatIncoming: this.heartbeatIn,
        heartbeatOutgoing: this.heartbeatOut,
        debug: this.isDebugEnabled ? (str): void=>{
          console.debug('[NW Stomp Client]: ' + str);
        } : (str):  string =>{ return str; }
      });

    }

    /**
     * Subscribe to a channel/topic/exchange
     * @param channel the channel/topic/exchange name
     * @param cb Callback Function
     */
    subscribe(channel: string, cb: messageCallbackType): StompSubscription {
      return this.client.subscribe(channel, cb);
    }

    /**
     * On Connect Event
     * @param cb Callback Function
     */
    onConnect = (cb: Frame): void => {
      this.client.onConnect(cb);
    }

    /**
     * On Error Event
     * @param cb Callback Function
     */
    onError = (cb: Frame): void => {
      this.client.onStompError(cb);
    }

    /**
     * On Websocket Close Event
     * @param cb Callback Function
     */
    onWebSocketClose = (cb: CloseEvent): void => {
      this.client.onWebSocketClose(cb);
    }

    /**
     * Open WebSocket Connection
     */
    activate = (): void => {
      this.client.activate();
    }

    /**
     * Close WebSocket Connection
     */
    deactivate = (): void => {
      this.client.deactivate();
    }

}
