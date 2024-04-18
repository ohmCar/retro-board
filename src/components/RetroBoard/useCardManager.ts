import {useEffect, useState} from 'react';
import {Card, ColumnType} from "../../types/types";
import {loadCards, saveCards} from "../../service/cardService";

const useCardManager = (columnType: ColumnType) => {
    const localStorageKey = `cards-${columnType}`;
    const [cards, setCards] = useState<Card[]>(() => loadCards(localStorageKey));

    useEffect(() => {
        saveCards(localStorageKey, cards);
    }, [cards, localStorageKey]);

    const addCard = (text: string): void => {
        const newCard = {
            id: Date.now(),
            text
        };
        setCards(prevCards => [...prevCards, newCard]);
    };

    const editCard = (cardId: number, text: string): void => {
        setCards(prevCards => prevCards.map(card => card.id === cardId ? {...card, text} : card));
    };

    const deleteCard = (cardId: number): void => {
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    };

    return {
        cards,
        addCard,
        editCard,
        deleteCard
    };
};

export default useCardManager;
