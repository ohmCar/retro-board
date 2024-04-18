export interface Card {
    id: number;
    text: string;
}

export enum ColumnType {
    WentWell = "WentWell",
    ToImprove = "ToImprove",
    ActionItems = "ActionItems"
}
