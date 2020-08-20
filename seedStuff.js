const seedStuff = (()=> {
  const cohSeedChars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
  const cohSeedCodes = cohSeedChars.split('').map(v => v.charCodeAt(0)).sort((a,b)=> a - b);
  
  const minCode = cohSeedCodes[0];
  const maxCode = cohSeedCodes[cohSeedCodes.length - 1];
  const minCodeNumDigits = numDigits(minCode);
  const maxCodeNumDigits = numDigits(maxCode);
  const minR = minCode % 10;
  
  const INT32_MAX = 0x7fffffff;
  const INT32_MIN = -0x7fffffff - 1;
  const UINT32_MAX = 0xffffffff;
  
  // gets the nth digit from the right.
  function getDigit(nth, number) {
    return Math.floor((number/Math.pow(10,nth)) % 10);
  }
  
  // gets the total number of digits in a number
  function numDigits(x) {
    return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
  }
  
  // helper to find the steps to the next digit
  function getDistToNextDigit(to, from) {
    let steps = to - from;
    if (steps < 0)
      steps += 10;
    return steps;
  }
  
  const randomizeCode = (code) => {
    let maxRange = 10 - Math.floor(code / 10);
    let newCode = code + Math.floor(Math.random() * maxRange) * 10;
    return newCode;
  }
  
  
  // try to find a viable set of characters for a negative seed number
  // finds codes right to left, with the minimum possible character values (unless you randomize it for funzies)
  function tryGenerateSeed(numSeed, seedLen, randomize) {
    let currentVal = 0;
    let i = 0;
    let seed = '';
    // stop 1 before the last character
    while (i < seedLen - 2) {
      // get the digit on the seed
      let seedDigit = getDigit(i, numSeed);
      // get the digit of our running total
      let currentDigit = getDigit(i, currentVal);
      let digitDist = getDistToNextDigit(seedDigit, currentDigit);
  
      // get the minimum viable code (note the characters and codes are sequential)
      let code =  cohSeedCodes[getDistToNextDigit(digitDist, minR)];
  
      // randomize the value for funzies
      if (randomize && i < seedLen - 4){
        code = randomizeCode(code);
      }
      
      // update our current value and seed
      currentVal += code * Math.pow(10, i);
      seed = String.fromCharCode(code) + seed;
  
      ++i;
    }

    // get a code for the remaining value
    // (numSeed - currentValue) will be something like 450000000
    // I just want the 45
    var lastCode =  Math.floor((numSeed - currentVal) / Math.pow(10, i));
    if (lastCode >= minCode && lastCode <= maxCode) {
      // success!
      return String.fromCharCode(lastCode) + seed;
    }
  
    return null;
  }
  
  function textFromSeed(numSeed, randomize) {
    if (typeof(numSeed) !== 'number') {
      throw 'Bad numSeed - why are you trying to send non-numbers to this function?';
    }
  
    // js numbers are double floating point precision (so just truncate that garbage)
    numSeed = Math.floor(numSeed);
  
    // -1 is a special seed - it generates a random seed.
    if (numSeed === -1) {
      throw 'Don\'t use -1. -1 will generate a new random seed when the game starts.';
    }
  
    // positive ints are easy peezy
    if (numSeed >= 0) {
      // the game tries to cast the seed text as an int32 and then mod it by int32.max
      // I tested seed 2147483650 (2147483647 + 3). The in-game seed was 3 lul.
      return numSeed % (INT32_MAX + 1).toString();
    }
  
    // shrink the seed number if it's really big.
    numSeed %= INT32_MIN - 1; // note the js % operator always takes the sign of the dividend.
  
    // you can enter max 10 characters as the seed#
    let seedLen = numDigits(numSeed);
    if (seedLen < 10) {
      // so just like return that value
      return numSeed.toString();
    }
  
    // turn the seed into a positive number that's > int32_max and <= uint32_max (so the game will wrap it around to a negative integer)
    numSeed = numSeed + UINT32_MAX + 1;
    var seed = null;
    do {
      seed = tryGenerateSeed(numSeed, seedLen, randomize);
      numSeed += 0x100000000;
      seedLen = numDigits(numSeed);
    } while (
      // sanity check
      numSeed < Number.MAX_SAFE_INTEGER &&
      // still need a valid seed
      !seed &&
      // 11 digits max, it could support more but it would need to look for max value char codes first
      seedLen < 12
    );
  
    return seed;
  }

  // Priw8s function! They totally wrote it not me.
  function seedFromText(seed) {
    if (seed.length > 10 || seed.length == 0)
        throw "Bad seed length";

    let numSeed = 0;
    for (let i=seed.length-1, pow=0; i>=0; --i, ++pow) {
        numSeed = numSeed + Math.pow(10, pow) * seed.charCodeAt(i);
    }
    numSeed = numSeed % 0x100000000; // s32 overflow
    if (numSeed > 0x7fffffff) {
        numSeed = -(0xffffffff - numSeed + 1);
    }
    return numSeed;
  }

  return { 
    textFromSeed: textFromSeed,
    seedFromText: seedFromText
  };
})();

export const textFromSeed = seedStuff.textFromSeed;
export const seedFromText = seedStuff.seedFromText;
