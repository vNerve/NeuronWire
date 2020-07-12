import { w3cwebsocket } from 'websocket';
import StompClient from "./clients/StompClient";
import StompRoomExchange from "./exchanges/room/StompRoomExchange";
import { ENDPOINT } from "./constants/ENDPOINT";

const NeuronWire = {
  _internal:{
    Endpoint: {
      Preset: ENDPOINT
    }
  },
  ClientConnector: {
    StompClientConnector: StompClient
  },
  Exchange:{
    Room:{
      StompRoomExchange: StompRoomExchange
    }
  }
};

// For node program only, STOMP.js need a websocket polyfill
if(module !== undefined) {
  Object.assign(global, { WebSocket: w3cwebsocket });
}

export default NeuronWire;

