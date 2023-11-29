type CardType = {
    issuer: string;
    cardNumberLength: number;
    regex: RegExp;
    cvcLength: number
}

export const CardTypes: CardType[] = [
    {
        issuer: 'MasterCard',
        cardNumberLength: 16,
        regex: /^5[1-5]\d{14}/,
        cvcLength: 3
    },
    {
        issuer: 'Visa',
        cardNumberLength: 16,
        regex: /^4\d{15}/,
        cvcLength: 3
    },
];