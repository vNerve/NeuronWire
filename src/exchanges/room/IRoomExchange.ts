import { StompSubscription } from "@stomp/stompjs";
import { vNerve } from '../../types/vNerveTransmitter/vNerve.js';
import RoomMessage = vNerve.bilibili.live.RoomMessage;

/**
 * Room Exchange Interface, all Room Exchange should implement this interface.
 */
export interface IRoomExchange {
    client: unknown;
    subscriptionHMap: ISubscriptionHMap;

    subscribe(roomID: string, type: 'gift' | 'danmaku' | 'online' | '*' // wip: 茶栗 need give me more message type
              ,cb: roomMessageCallback): string;
    unsubscribe(id: string): void;
}

/**
 * Subscription Hashmap Interface
 */
export interface ISubscriptionHMap {
    [subscriber: string]: StompSubscription;
}

// Message Callback Function declaration
export declare type roomMessageCallback = (message: RoomMessage) => void;

