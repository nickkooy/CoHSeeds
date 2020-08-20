const seedStuff = require('./seedStuff');
let seed = -1352168915; // (Goof's 16:34.56 PB)
let textSeed = seedStuff.textFromSeed(seed, true);
console.log(textSeed);  // It's randomized so it'll be something like D'%.....
console.log(seedStuff.seedFromText(textSeed));