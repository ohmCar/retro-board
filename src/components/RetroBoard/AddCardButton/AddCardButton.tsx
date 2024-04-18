import React from "react";

interface AddCardButtonProps {
    onAdd: () => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({onAdd}) => (
    <button onClick={onAdd} className="w-full h-6 cursor-pointer bg-cool-gray text-manatee">
        +
    </button>
);

export default AddCardButton;
