import React, {useState} from 'react';
import {getColumnCardColor} from "../../../utils/utils";
import {ColumnType} from "../../../types/types";

interface RetroCardProps {
    id: number;
    text: string;
    onEdit: (cardId: number, text: string) => void;
    onDelete: (cardId: number) => void;
    columnType: ColumnType
}

const RetroCard: React.FC<RetroCardProps> = ({id, text, onEdit, onDelete, columnType}) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!isMenuVisible);
    const handleEdit = () => {
        onEdit(id, text);
        setMenuVisible(false);
    };

    const handleDelete = () => {
        onDelete(id);
        setMenuVisible(false);
    };

    const backgroundClass = `bg-${getColumnCardColor(columnType)}`;
    return (
        <div
            data-testid="retro-card"
            className={`p-2.5 my-2.5 rounded-sm text-white min-h-[35px] relative ${backgroundClass}`}>
            <span className="break-all">{text}</span>
            <button className="absolute top-2.5 right-2.5 text-xl" onClick={toggleMenu}>⋮</button>
            {isMenuVisible && (
                <div
                    className="absolute right-0 top-10 bg-white p-2.5 rounded-sm shadow-md flex flex-col z-10 text-black">
                    <button className="py-2 text-left hover:bg-gray-100 w-full" onClick={handleEdit}>Edit Card</button>
                    <button className="py-2 text-left hover:bg-gray-100 w-full" onClick={handleDelete}>Delete Card
                    </button>
                </div>
            )}
        </div>
    );
};

export default RetroCard;
