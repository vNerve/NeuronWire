import { StompSubscription } from "@stomp/stompjs";
import { vNerve } from '../../types/vNerveTransmitter/vNerve.js';

/**
 * Room Exchange Interface, all Room Exchange should implement this interface.
 * @internal
 */
export interface IRoomExchange {
    /**
     * Client Connector
     */
    client: unknown;
    /**
     * Hash Map
     */
    subscriptionHMap: ISubscriptionHMap;

    subscribe(roomID: string, type: 'gift' | 'danmaku' | 'online' | 'sc' | '*' // wip: 茶栗 need give me more message type
              ,cb: roomMessageCallback): string;
    unsubscribe(id: string): void;
}

/**
 * Subscription Hashmap Interface
 * @internal
 * @ignore
 */
export interface ISubscriptionHMap {
    [subscriber: string]: StompSubscription;
}

/**
 * Message Callback Function declaration
 */
export declare type roomMessageCallback = (message: vNerve.bilibili.live.RoomMessage) => void;

