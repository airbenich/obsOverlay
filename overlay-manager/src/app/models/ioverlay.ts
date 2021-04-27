export interface IOverlay {
    id: string | null;
    title: string;
    subtitle: string;
    design: string;
    lastChange: string;
    pinnedToTop: boolean;
    pinnedToTopSorting: number;
    sort: number;
    favorit: boolean;
    favoritSorting: number;
    readOnly: boolean;
    deleted?: boolean;
}
