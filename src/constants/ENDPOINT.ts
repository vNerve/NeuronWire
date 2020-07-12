import { Endpoint } from "../types/Endpoint";
/**
 * Pre-set Endpoint Client
 * @internal
 */
export const ENDPOINT: Endpoint[] = [
  {
    url: 'mq1.vnerve.dd.center:7216/ws',
    protocol: 'wss',
    name: 'mirror1',
    username: 'vnerve',
    password: 'vnerve'
  },
  {
    url: 'mq2.vnerve.dd.center:7216/ws', // wip: 茶栗 need to make this work
    protocol: 'wss',
    name: 'mirror1',
    username: 'vnerve',
    password: 'vnerve'
  }
];
