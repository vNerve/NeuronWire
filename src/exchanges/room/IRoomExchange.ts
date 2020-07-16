import { StompSubscription } from "@stomp/stompjs";
import { vNerve } from '../../types/vNerveTransmitter';

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

    subscribe(roomID: string, type: 'gift' | 'danmaku' | 'online' |
                  'new_guard' | 'welcome_vip' | 'welcome_guard' | 'sc' |
                  'user_blocked'| 'live_status' | 'room_change' | 'room_locked' |
                  'room_warning'| 'room_limited' | 'sc_delete' | '*'
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

