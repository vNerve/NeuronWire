import StompClient from "../../clients/StompClient";
import { IMessage } from "@stomp/stompjs";
import { IRoomExchange, ISubscriptionHMap, roomMessageCallback } from "./IRoomExchange";
import { vNerve } from '../../types/vNerveTransmitter';

/**
 * STOMP(WebSocket) protocol Live Room Info Exchange
 */
export default class StompRoomExchange implements IRoomExchange{
    client: StompClient
    subscriptionHMap: ISubscriptionHMap = {};

    /**
     * Room Exchange, using Stomp protocol
     * @param client StompClient instance
     */
    constructor(client: StompClient) {
      this.client = client;
    }

    /**
     * subscribe to a Bilibili Live Room
     * @param roomID Bilibili Live Room ID
     * @param type Message Type
     * @param msgCb Message Callback Function
     * @return Hash Map ID
     */
    subscribe = (roomID: string, type= '*', msgCb: roomMessageCallback): string => {
      const subscription = this.client.subscribe(`/exchange/vNerve/blv.${roomID}.${type}`,(rawCb: IMessage) => {
        const roomMsg = vNerve.bilibili.live.RoomMessage.decode(rawCb.binaryBody);
        msgCb(roomMsg);
      });
        // save to hashmap
      this.subscriptionHMap[subscription.id] = subscription;
      return this.subscriptionHMap[subscription.id].id;
    }

    /**
     * Unsubscribe a live room by id in Hash Map ID
     * @param id Hash Map ID
     */
    unsubscribe = (id: string): void => {
      this.subscriptionHMap[id].unsubscribe();
      delete this.subscriptionHMap[id];
    }

}
