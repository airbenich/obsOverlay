export interface IOverlay {
    id: number | null;
    title: string;
    subtitle: string;
    design: string;
    lastChange: string;
    pinnedToTop: boolean;
    sort: number;
    favorit: boolean;
    readOnly: boolean;
    deleted?: boolean;
}
