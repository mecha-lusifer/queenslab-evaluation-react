import { CardTypes } from "./cardtypes";

export function pruneNumberString(cardNumber: string) {
    let unformattedNumber = '';
    for (let idx = 0; idx < cardNumber.length; idx++) {
        const currentChar = cardNumber[idx];
        if (currentChar !== ' ' && !isNaN(Number(currentChar))) {
            unformattedNumber += currentChar;
        }
    }
    return unformattedNumber;
}

export function formatCardNumber(element: HTMLInputElement) {
    const unformattedNumber = pruneNumberString(element.value);
    const cardType = CardTypes.find((ct) => ct.regex.test(unformattedNumber));

    if (unformattedNumber) {
        let formattedNumber = unformattedNumber[0];
        for (let idx = 1; idx < (cardType?.cardNumberLength || 19); idx++) {
            if (idx >= unformattedNumber.length) break;
            if (idx % 4 === 0) formattedNumber += ' ';
            formattedNumber += unformattedNumber[idx];
        }
        element.value = formattedNumber;
    }
}

export function formatCVC(element: HTMLInputElement) {
    const cvc = pruneNumberString(element.value);
    element.value = cvc.slice(0, 4);
}