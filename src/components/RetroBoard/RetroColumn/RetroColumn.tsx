import React from 'react';
import RetroCard from "../RetroCard/RetroCard";
import CardInput from "../CardInput/CardInput";
import useCardManager from "../useCardManager";
import {ColumnType} from "../../../types/types";
import AddCardButton from "../AddCardButton/AddCardButton";
import useColumnControls from "./useColumnControls";
import {getColumnTitle} from "../../../utils/utils";

interface ColumnProps {
    columnType: ColumnType;
}

const RetroColumn: React.FC<ColumnProps> = ({columnType}) => {
    const {cards, addCard, editCard, deleteCard} = useCardManager(columnType);
    const {
        inputValue,
        handleInputChange,
        handleCancel,
        handleSubmit,
        handleOnEdit,
        handleOnAdd,
        isAdding,
        editId
    } = useColumnControls({columnType, addCard, editCard, cards});

    const renderCardInput = () => (
        <CardInput
            key={`input-${editId || 'new'}`}
            columnType={columnType}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
        />
    );

    const renderCards = () => {
        return cards.map((card) => card.id === editId
            ? renderCardInput()
            : <RetroCard
                key={card.id}
                id={card.id}
                text={card.text}
                onDelete={deleteCard}
                onEdit={() => handleOnEdit(card.id, card.text)}
                columnType={columnType}
            />);
    };

    return (
        <div className="flex flex-col p-2 min-w-[300px] w-full max-w-full sm:flex-1 sm:max-w-[30%]">
            <span className="text-lg font-medium">
                {getColumnTitle(columnType)}
            </span>
            <AddCardButton onAdd={handleOnAdd}/>
            {renderCards()}
            {isAdding && renderCardInput()}
        </div>
    );
};

export default RetroColumn;
