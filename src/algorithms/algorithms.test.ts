import { expect, describe, it } from 'vitest';
import { maximumOddSum, removeIdenticalLetters, removeIdenticalLettersFast } from ".";
import { checkProcessedString, generateRandomIntegerArray, generateRandomRepeatingSequences } from './testhelpers';

const largeTestString = generateRandomRepeatingSequences(2e1);

describe('removeIdenticalLetters', () => {
    it('should work on examples', () => {
        expect(removeIdenticalLetters('ffdttttyy')).toBe('ffdtttyy');
        expect(removeIdenticalLetters('iiikigggg')).toBe('iiikiggg');
    });

    it('should work on large strings with 2e7 characters (~2s on my machine)', () => {
        expect(checkProcessedString(removeIdenticalLetters(largeTestString))).toBeTruthy();
    });

});

describe('removeIdenticalLettersFast', () => {
    it('should work on examples', () => {
        expect(removeIdenticalLettersFast('ffdttttyy')).toBe('ffdtttyy');
        expect(removeIdenticalLettersFast('iiikigggg')).toBe('iiikiggg');
    });

    it('should work on large strings with 2e7 characters (~250ms on my machine)', () => {
        expect(checkProcessedString(removeIdenticalLettersFast(largeTestString))).toBeTruthy();
    });
});


describe('maximumOddSum', () => {
    it('should work on examples', () => {
        expect(maximumOddSum([19, 2, 42, 18])).toBe(61);
        expect(maximumOddSum([61, 32, 51])).toBe(93);
    });

    it('should work on large arrays', () => {
        const testArray = generateRandomIntegerArray(1.5e5, 1.5e6);
        // Difficult to verify... let's just check how long it takes!
        const start = performance.now();
        maximumOddSum(testArray);
        const end = performance.now();
        // This runs in just under a minute on my machine
        expect(start - end).toBeLessThan(6e4);
    });
});