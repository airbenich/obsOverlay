export interface Status {
    service: string;
    status: 'offline' | 'online' | 'connecting';
}
