import React from 'react';
import {getColumnCardColor} from "../../../utils/utils";
import {ColumnType} from "../../../types/types";

interface CardInputProps {
    inputValue: string;
    columnType: ColumnType;
    onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

const CardInput: React.FC<CardInputProps> = ({inputValue, columnType, onInputChange, onSubmit, onCancel}) => {
    const borderClassName = `border-${getColumnCardColor(columnType)}`;
    return (
        <div className="mt-2.5 relative">
            <textarea
                value={inputValue}
                onChange={onInputChange}
                placeholder="Type something..."
                className={`w-full p-2 border-2 ${borderClassName} focus:outline-none`}
                data-testid="card-input-text-area"
            />
            <div className="absolute right-2.5 bottom-2.5 flex gap-1.5">
                <button className="text-white bg-blue-500 p-1" onClick={onSubmit}>&#10003;</button>
                <button className="text-white bg-red-600 p-1" onClick={onCancel}>&#10005;</button>
            </div>
        </div>
    );
};

export default CardInput;
