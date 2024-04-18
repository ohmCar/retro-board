export const loadCards = (key: string) => {
    const savedCards = localStorage.getItem(key);
    return savedCards ? JSON.parse(savedCards) : [];
};

export const saveCards = (key: string, cards: any[]) => {
    localStorage.setItem(key, JSON.stringify(cards));
};
