import useColumnControls from './useColumnControls';
import {act, renderHook, waitFor} from "@testing-library/react";
import {ColumnType} from "../../../types/types";
import React from "react";

describe('useColumnControls', () => {
    const initialCards = [
        { id: 1, text: 'Card 1' },
        { id: 2, text: 'Card 2' }
    ];
    const mockAddCard = jest.fn();
    const mockEditCard = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useColumnControls({
            columnType: ColumnType.WentWell,
            addCard: mockAddCard,
            editCard: mockEditCard,
            cards: initialCards
        }));

        expect(result.current.inputValue).toBe('');
        expect(result.current.isAdding).toBe(false);
        expect(result.current.editId).toBeNull();
    });

    it('should handle input change', () => {
        const { result } = renderHook(() => useColumnControls({
            columnType: ColumnType.WentWell,
            addCard: mockAddCard,
            editCard: mockEditCard,
            cards: initialCards
        }));

        act(() => {
            result.current.handleInputChange({ target: { value: 'New text' } } as React.ChangeEvent<HTMLTextAreaElement>);
        });

        expect(result.current.inputValue).toBe('New text');
    });

    it('submits a new card', async () => {
        const { result } = renderHook(() => useColumnControls({
            columnType: ColumnType.WentWell,
            addCard: mockAddCard,
            editCard: mockEditCard,
            cards: initialCards
        }));

        act(() => {
            result.current.handleInputChange({ target: { value: 'New card' } } as React.ChangeEvent<HTMLTextAreaElement>);
        });

        await waitFor(() => expect(result.current.inputValue).toBe('New card'));

        act(() => result.current.handleSubmit())

        expect(mockAddCard).toHaveBeenCalledWith('New card');
        expect(result.current.inputValue).toBe('');
        expect(result.current.isAdding).toBe(false);
        expect(result.current.editId).toBeNull();
    });

    it('should edit an existing card', async () => {
        const { result } = renderHook(() => useColumnControls({
            columnType: ColumnType.WentWell,
            addCard: mockAddCard,
            editCard: mockEditCard,
            cards: initialCards
        }));
        const updatedText = 'Updated card 1';

        act(() => {
            result.current.handleOnEdit(1, 'Edited text');
            result.current.handleInputChange({ target: { value: updatedText } } as React.ChangeEvent<HTMLTextAreaElement>);
        });
        await waitFor(() => expect(result.current.editId).toBe(1))
        await waitFor(() => expect(result.current.inputValue).toBe(updatedText))
        act(() => result.current.handleSubmit())

        expect(mockEditCard).toHaveBeenCalledWith(1, updatedText);
        expect(result.current.inputValue).toBe('');
        expect(result.current.isAdding).toBe(false);
        expect(result.current.editId).toBeNull();
    });

    it('should cancel adding/editing', () => {
        const { result } = renderHook(() => useColumnControls({
            columnType: ColumnType.WentWell,
            addCard: mockAddCard,
            editCard: mockEditCard,
            cards: initialCards
        }));

        act(() => {
            result.current.handleOnAdd();
            result.current.handleInputChange({ target: { value: 'New card' } } as React.ChangeEvent<HTMLTextAreaElement>);
            result.current.handleCancel();
        });

        expect(result.current.inputValue).toBe('');
        expect(result.current.isAdding).toBe(false);
        expect(result.current.editId).toBeNull();
    });
});
