export function generateRandomRepeatingSequences(length: number) : string {
    let output = new Uint8Array(length);
    let charCounter = 0;
    for (let idx = 0; idx < length; idx++) {
        // Limit characters to a-z
        output[idx] = 97 + charCounter % 26;
        // Characters will be randomly repeated with a 50% chance
        if (Math.random() < 0.5) charCounter++;
    }

    return new TextDecoder().decode(output);
}

export function checkProcessedString(str: string) : boolean {
    let lastChar = str[0];
    let counter = 1;
    for (let idx = 1; idx < str.length; idx++) {
        let currentChar = str[idx];

        if (currentChar !== lastChar) counter = 1;
        else if (++counter >= 4) return false;

        lastChar = currentChar;
    }

    return true;
}

export function generateRandomIntegerArray(length: number, maxInt: number): number[] {
    const testArray = Array<number>(length);
    for (let i = 0; i < length; i++) {
        testArray[i] = Math.floor(Math.random() * maxInt);
    }
    return testArray;
}
