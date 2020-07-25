import StompClient from '../clients/StompClient';
import { IMessage, StompSubscription } from '@stomp/stompjs';
import { IRoomExchange } from './IRoomExchange';
import { vNerve } from '../types/vNerveTransmitter';
import { createNanoEvents, Emitter } from 'nanoevents';
/**
 * STOMP(WebSocket) protocol Live Room Info Exchange
 */
export default class StompRoomExchange implements IRoomExchange{
    client: StompClient
    subscription: StompSubscription = null;
    subscriptionEmitter: Emitter = createNanoEvents();

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
     */
    subscribe = (roomID: string, type = '*'): void => {
      if(this.subscription !== null){
        throw new Error('A subscription has already been subscribed!');
      }
      this.subscription = this.client.subscribe(`/exchange/vNerve/blv.${roomID}.${type}`, this.stompCb);
    }

    /**
     * Unsubscribe a live room by id in Hash Map ID
     */
    unsubscribe = (): void => {
      if(this.subscription === null){
        throw new Error('Subscription not set!');
      }
      this.subscription.unsubscribe();
      this.subscription = null;
      this.subscriptionEmitter.emit('unsubscribe', null);
    }

    private stompCb = (rawCb: IMessage): void => {
      const rootMessage = vNerve.bilibili.live.RoomMessage.decode(rawCb.binaryBody);
      this.subscriptionEmitter.emit('all', rootMessage);
      // huge switch
      switch (rootMessage.payload) {
      case 'popularityChange':
        this.subscriptionEmitter.emit('popularityChange', rootMessage.popularityChange.popularity);
        break;
      case 'liveStatus':
        this.subscriptionEmitter.emit('liveStatus', rootMessage.liveStatus.status);
        break;
      case 'infoChange':
        // eslint-disable-next-line no-case-declarations
        const changedInfo = new vNerve.bilibili.live.RoomInfoChangedMessage(rootMessage.infoChange);
        this.subscriptionEmitter.emit('infoChange', changedInfo);
        switch (changedInfo.changed) {
        case 'baseInfo':
          this.subscriptionEmitter.emit('baseInfo', changedInfo.baseInfo);
          break;
        case 'backgroundUrl':
          this.subscriptionEmitter.emit('backgroundUrl', changedInfo.backgroundUrl);
          break;
        case 'skinId':
          this.subscriptionEmitter.emit('skinId', changedInfo.skinId);
          break;
        case 'admin':
          this.subscriptionEmitter.emit('admin', changedInfo.admin.uid);
          break;
        }
        break;
      case 'roomLocked':
        this.subscriptionEmitter.emit('roomLocked', rootMessage.roomLocked.lockedUntil);
        break;
      case 'roomWarning':
        this.subscriptionEmitter.emit('roomWarning', rootMessage.roomWarning.message);
        break;
      case 'roomLimited':
        this.subscriptionEmitter.emit('roomLimited', rootMessage.roomLimited);
        break;
      case 'superchatDelete':
        this.subscriptionEmitter.emit('superchatDelete', rootMessage.superchatDelete.id);
        break;
      case 'userMessage':
        // eslint-disable-next-line no-case-declarations
        const userMessage = new vNerve.bilibili.live.UserMessage(rootMessage.userMessage);
        this.subscriptionEmitter.emit('userMessage', userMessage);
        switch (userMessage.payload)
        {
        case 'danmaku':
          this.subscriptionEmitter.emit('danmaku', userMessage.danmaku);
          break;
        case 'gift':
          this.subscriptionEmitter.emit('gift', userMessage.gift);
          break;
        case 'superChat':
          this.subscriptionEmitter.emit('superChat', userMessage.superChat);
          break;
        case 'newGuard':
          this.subscriptionEmitter.emit('newGuard', userMessage.newGuard);
          break;
        case 'welcomeVip':
          this.subscriptionEmitter.emit('welcomeVip', userMessage.welcomeVip);
          break;
        case 'welcomeGuard':
          this.subscriptionEmitter.emit('welcomeGuard', userMessage.welcomeGuard);
          break;
        case 'userBlocked':
          this.subscriptionEmitter.emit('userBlocked', userMessage.userBlocked);
          break;
        }
        break;
      }
    }

    get emitter(): Emitter{
      return this.subscriptionEmitter;
    }

}
