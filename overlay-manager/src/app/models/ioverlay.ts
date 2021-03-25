export interface IOverlay {
    id: string | null;
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
