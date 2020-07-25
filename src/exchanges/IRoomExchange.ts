import { StompSubscription } from "@stomp/stompjs";

/**
 * Room Exchange Interface, all Room Exchange should implement this interface.
 * @internal
 */
export interface IRoomExchange {
    /**
     * Client Connector
     */
    client: unknown;
    subscription: StompSubscription;
    /**
     * Hash Map
     */

    subscribe(roomID: string, type: 'gift' | 'danmaku' | 'online' |
                  'new_guard' | 'welcome_vip' | 'welcome_guard' | 'sc' |
                  'user_blocked'| 'live_status' | 'room_change' | 'room_locked' |
                  'room_warning'| 'room_limited' | 'sc_delete' | '*'
              ): unknown;
    unsubscribe(id: string): unknown;
}
