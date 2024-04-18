import {getColumnCardColor, getColumnTitle} from "./utils";
import {ColumnType} from "../types/types";

describe('Utils', () => {
    describe('getColumnCardColor', () => {
        it('should return correct color for WentWell', () => {
            const color = getColumnCardColor(ColumnType.WentWell);
            expect(color).toEqual('dark-cyan');
        });

        it('should return correct color for ToImprove', () => {
            const color = getColumnCardColor(ColumnType.ToImprove);
            expect(color).toEqual('strawberry-mix');
        });

        it('should return correct color for ActionItems', () => {
            const color = getColumnCardColor(ColumnType.ActionItems);
            expect(color).toEqual('royal-purple');
        });
    });

    describe('getColumnTitle', () => {
        it('should reformat WentWell to "Went Well"', () => {
            const title = getColumnTitle(ColumnType.WentWell);
            expect(title).toEqual('Went Well');
        });

        it('should reformat ToImprove to "To Improve"', () => {
            const title = getColumnTitle(ColumnType.ToImprove);
            expect(title).toEqual('To Improve');
        });

        it('should reformat ActionItems to "Action Items"', () => {
            const title = getColumnTitle(ColumnType.ActionItems);
            expect(title).toEqual('Action Items');
        });
    });
})
