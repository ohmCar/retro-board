import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import RetroColumn from './RetroColumn';
import {ColumnType} from '../../../types/types';
import * as ColumnControls from './useColumnControls';
import * as CardManager from '../useCardManager';

jest.mock('../RetroCard/RetroCard', () => (props: {
    text: string;
    onEdit: () => void;
    onDelete: () => void;
    id: number;
    columnType: ColumnType
}) => <div data-testid="RetroCard">{props.text}</div>);
jest.mock('../CardInput/CardInput', () => (props: {
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel: () => void;
    onSubmit: () => void;
}) => <input data-testid="CardInput" value={props.inputValue} onChange={props.onInputChange}/>);
jest.mock('../AddCardButton/AddCardButton', () => ({onAdd}: { onAdd: () => void }) => <button onClick={onAdd}>Add
    Card</button>);
jest.mock('../useCardManager');
jest.mock('./useColumnControls');

const otherControlsProps = {
    inputValue: '',
    handleInputChange: jest.fn(),
    handleCancel: jest.fn(),
    handleSubmit: jest.fn(),
    handleOnEdit: jest.fn(),
    isAdding: false,
    editId: null,
    handleOnAdd: jest.fn()
}

describe('RetroColumn', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(ColumnControls, 'default').mockImplementation(() => {
            return {
                ...otherControlsProps
            }
        })
        jest.spyOn(CardManager, 'default').mockImplementation(() => {
            return {
                cards: [{id: 1, text: 'Test Card'}],
                addCard: jest.fn(),
                editCard: jest.fn(),
                deleteCard: jest.fn(),
            }
        })
    });

    it('should render the column title and card components correctly', () => {
        render(<RetroColumn columnType={ColumnType.WentWell}/>);
        expect(screen.getByText('Went Well')).toBeInTheDocument();
        expect(screen.getByTestId('RetroCard')).toHaveTextContent('Test Card');
        expect(screen.queryByTestId('CardInput')).toBeNull();
    });

    it('should render an input when isAdding is true', () => {
        jest.spyOn(ColumnControls, 'default').mockImplementation(() => {
            return {
                ...otherControlsProps,
                isAdding: true,
                inputValue: 'New Card'
            }
        })
        render(<RetroColumn columnType={ColumnType.WentWell}/>);
        expect(screen.getByTestId('CardInput')).toHaveValue('New Card');
    });

    it('should call handleOnAdd when add card button is clicked', () => {
        const mockHandleOnAdd = jest.fn();
        jest.spyOn(ColumnControls, 'default').mockImplementation(() => {
            return {
                ...otherControlsProps,
                handleOnAdd: mockHandleOnAdd
            }
        })
        render(<RetroColumn columnType={ColumnType.WentWell}/>);
        fireEvent.click(screen.getByText('Add Card'));
        expect(mockHandleOnAdd).toHaveBeenCalledTimes(1);
    });
});
