import React from 'react';
import {render} from '@testing-library/react';
import RetroBoard from './RetroBoard';
import RetroColumn from './RetroColumn/RetroColumn';
import {ColumnType} from "../../types/types";

jest.mock('./RetroColumn/RetroColumn', () => {
    return {
        __esModule: true,
        default: jest.fn(() => null),
    };
});

describe('RetroBoard', () => {
    it('should render a RetroColumn for each column type', () => {
        render(<RetroBoard/>);

        expect(RetroColumn).toHaveBeenCalledTimes(Object.keys(ColumnType).length);

        Object.values(ColumnType).forEach((type, index) => {
            expect(RetroColumn).toHaveBeenNthCalledWith(index + 1, {
                columnType: type
            }, {});
        });
    });
});
