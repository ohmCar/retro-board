import React, {useState} from 'react';
import {ColumnType} from '../../../types/types';

interface UseColumnControlsProps {
    columnType: ColumnType;
    addCard: (text: string) => void;
    editCard: (id: number, text: string) => void;
    cards: Array<{ id: number, text: string }>;
}

const useColumnControls = ({columnType, addCard, editCard, cards}: UseColumnControlsProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value);

    const resetInput = () => {
        setInputValue('');
        setEditId(null);
        setIsAdding(false);
    };

    const handleSubmit = () => {
        if (inputValue.trim()) {
            editId ? editCard(editId, inputValue) : addCard(inputValue)
            resetInput();
        }
    };

    const handleCancel = () => resetInput();

    const handleOnEdit = (cardId: number, text: string) => {
        if (!isAdding) {
            setEditId(cardId);
            setInputValue(text);
        }
    };

    const handleOnAdd = () => {
        if (!editId) setIsAdding(true);
    };

    return {
        inputValue,
        handleInputChange,
        handleCancel,
        handleSubmit,
        handleOnEdit,
        handleOnAdd,
        isAdding,
        editId
    };
};

export default useColumnControls;
