const seedStuff = require('./seedStuff');
let seed = seedStuff.seedFromText('o&.>01!@!');
console.log(seed);
console.log(seedStuff.textFromSeed(seed, true));