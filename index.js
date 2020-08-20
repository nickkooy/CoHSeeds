import { textFromSeed, seedFromText } from './seedStuff.js';
let seed = -1352168915; // (Goof's 16:34.56 PB)
let textSeed = textFromSeed(seed, true);
console.log(textSeed);  // It's randomized so it'll be something like D'%.....
console.log(seedFromText(textSeed));