// Endpoint Interface Format
export interface Endpoint {
    url: string;
    name: string;
    protocol: 'ws' | 'wss';
    username: string;
    password: string;
}
