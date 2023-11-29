import { CardTypes } from "./cardtypes";
import { pruneNumberString } from "./formatting";

export function validateCardNumber(cardNumber: string): boolean {
    const unformattedNumber = pruneNumberString(cardNumber);
    const cardType = CardTypes.find((ct) => ct.regex.test(unformattedNumber));
    return !!cardType;
}

export function validateCardHolder(cardHolder: string): boolean {
    return /^[a-zA-Z\s']{1,24}$/.test(cardHolder);
}

export function validateCVC(cvc: string, cardNumber?: string): boolean {
    if (isNaN(Number(cvc))) return false;

    if (cardNumber) {
        const cardType = CardTypes.find((ct) => ct.regex.test(pruneNumberString(cardNumber)));
        return cvc.length === cardType?.cvcLength;
    }

    const cardType = CardTypes.find((ct) => cvc.length === ct.cvcLength);
    return !!cardType;
}

export function validateExpirationDate(monthString: string, yearString: string): boolean {
    const month = Number(monthString);
    const year = Number(yearString);

    if (isNaN(month) || isNaN(year)) return false;

    const expirationDate = new Date(year, month)
    return expirationDate > new Date();
}