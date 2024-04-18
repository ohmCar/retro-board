import {ColumnType} from "../types/types";

export const getColumnCardColor = (columnType: ColumnType) => {
    switch (columnType) {
        case ColumnType.WentWell:
            return "dark-cyan";
        case ColumnType.ToImprove:
            return "strawberry-mix";
        case ColumnType.ActionItems:
            return "royal-purple";
    }
};

export const getColumnTitle = (columnType: ColumnType) => {
    return columnType.replace(/([A-Z])/g, ' $1').trim();
}
