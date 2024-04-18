import { loadCards, saveCards } from './cardService';

describe('Card Service', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
    });

    describe('loadCards', () => {
        it('should return an empty array when no cards are saved', () => {
            expect(loadCards('myCards')).toEqual([]);
        });

        it('should return saved cards', () => {
            const cards = [{ id: 1, title: 'Card 1' }];
            localStorage.setItem('myCards', JSON.stringify(cards));
            expect(loadCards('myCards')).toEqual(cards);
        });
    });

    describe('saveCards', () => {
        it('should save cards into localStorage', () => {
            const cards = [{ id: 1, title: 'Card 1' }];
            const spySetItem = jest.spyOn(Storage.prototype, 'setItem');
            saveCards('myCards', cards);
            expect(spySetItem).toHaveBeenCalledWith('myCards', JSON.stringify(cards));
        });
    });
});
