const endingsDict = {
    productEndingsDict: ['товар', 'товара', 'товаров'],
};

export const getEnding = (num:number, endingDict:keyof typeof endingsDict) => {
    let endingIndex;
    if (num % 10 === 1 && num % 100 !== 11) {
        endingIndex = 0; // для 1
    } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
        endingIndex = 1; // для 2-4
    } else {
        endingIndex = 2; // для 0, 5-9, 11-14
    }
    return endingsDict[endingDict][endingIndex];
};
