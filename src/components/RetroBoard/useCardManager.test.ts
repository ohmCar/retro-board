import useCardManager from './useCardManager';
import * as cardService from '../../service/cardService';
import {ColumnType} from "../../types/types";
import {act, renderHook} from "@testing-library/react";

jest.mock('../../service/cardService', () => ({
    loadCards: jest.fn(),
    saveCards: jest.fn()
}));
describe('useCardManager', () => {
    const mockCards = [
        {id: 1, text: 'Test card 1'},
        {id: 2, text: 'Test card 2'}
    ];
    const columnType = ColumnType.WentWell;

    beforeEach(() => {
        jest.spyOn(cardService, "loadCards").mockReturnValue(mockCards);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize cards from localStorage', () => {
        const {result} = renderHook(() => useCardManager(columnType));
        expect(result.current.cards).toEqual(mockCards);
        expect(cardService.loadCards).toHaveBeenCalledWith(`cards-${columnType}`);
    });

    it('should save cards to localStorage when cards change', () => {
        const {result} = renderHook(() => useCardManager(columnType));
        act(() => {
            result.current.addCard('New card');
        });
        expect(cardService.saveCards).toHaveBeenCalledWith(`cards-${columnType}`, [...mockCards, {
            id: expect.any(Number),
            text: 'New card'
        }]);
    });

    it('should add a new card', () => {
        const {result} = renderHook(() => useCardManager(columnType));
        act(() => {
            result.current.addCard('New card');
        });
        expect(result.current.cards).toEqual([...mockCards, {
            id: expect.any(Number),
            text: 'New card'
        }]);
    });

    it('should edit an existing card', () => {
        const {result} = renderHook(() => useCardManager(columnType));
        act(() => {
            result.current.editCard(1, 'Updated text');
        });
        expect(result.current.cards).toEqual([
            {id: 1, text: 'Updated text'},
            {id: 2, text: 'Test card 2'}
        ]);
    });

    it('should delete a card', () => {
        const {result} = renderHook(() => useCardManager(columnType));
        act(() => {
            result.current.deleteCard(2);
        });
        expect(result.current.cards).toEqual([{id: 1, text: 'Test card 1'}]);
    });
});
