import { w3cwebsocket } from 'websocket';
import StompClient from "./clients/StompClient";
import StompRoomExchange from "./exchanges/StompRoomExchange";
import { ENDPOINT } from "./constants/ENDPOINT";

/**
 * This object defines the SDK
 */
export = {
  /**
   * internal sdk use, but useful for outsider as well
   */
  _internal:{
    /**
     * Pre-defined STOMP endpoint
     */
    Endpoint: {
      Preset: ENDPOINT
    }
  },
  /**
   * Client Connector Type
   */
  ClientConnector: {
    /**
     * STOMP protocol client connector class
     */
    StompClientConnector: StompClient
  },
  /**
   * Topic Exchange
   */
  Exchange:{
    /**
     * Room Topic Exchange
     */
    StompRoomExchange
  }
};

// For node program only, STOMP.js need a websocket polyfill
if(module !== undefined) {
  Object.assign(global, { WebSocket: w3cwebsocket });
}

