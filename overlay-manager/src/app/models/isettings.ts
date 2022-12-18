export interface ISettings {
  websocket: IWebsocketConfig;
}

export interface IWebsocketConfig {
  host: string;
  port: number;
  authCode: string;
}
