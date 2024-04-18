import React from 'react';
import RetroColumn from './RetroColumn/RetroColumn';
import {ColumnType} from '../../types/types';

const RetroBoard = () => {
    return (
        <div className="flex justify-around">
            {
                Object.values(ColumnType).map((column, index) => (
                    <RetroColumn
                        key={index}
                        columnType={column}
                    />
                ))
            }
        </div>
    );
};

export default RetroBoard;
