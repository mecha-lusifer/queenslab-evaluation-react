const removeIdenticalLetters = (str: string): string => {
  let output = '';
  let lastChar = '0'; // First character will never equal '0'
  let charCounter = 0;

  for (let idx = 0; idx < str.length; idx++) {
    const currentChar = str[idx];
    if (currentChar !== lastChar) {
      charCounter = 1;
      output += currentChar;
    } else if (++charCounter < 4) {
      output += currentChar;
    }

    lastChar = currentChar;
  }

  return output;
}

const removeIdenticalLettersFast = (str: string): string => {
  // Concatenating strings is slow, so let's use an array instead
  // This is much faster and only slightly harder to read!
  let output = new Uint8Array(str.length);
  let outputIdx = 0;
  let lastChar = 0; // First character will never equal '\x00'
  let charCounter = 0;

  for (let idx = 0; idx < str.length; idx++) {
    const currentChar = str.charCodeAt(idx);
    if (currentChar !== lastChar) {
      charCounter = 1;
      output[outputIdx++] = currentChar;
    } else if (++charCounter < 4) {
      output[outputIdx++] = currentChar;
    }

    lastChar = currentChar;
  }

  return new TextDecoder().decode(output.slice(0, outputIdx));
}

const maximumOddSum = (numbers: number[]): number => {
 let largestOddSum = 0;
 for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      if (sum % 2 !== 0 && sum > largestOddSum) largestOddSum = sum;
    }
  }
  return largestOddSum;
}

export {
  removeIdenticalLetters,
  removeIdenticalLettersFast,
  maximumOddSum
}
