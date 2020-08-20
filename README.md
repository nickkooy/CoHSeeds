# CoHSeeds

Has SeedStuff exports 2 functions.

## seedFromText('string')
This is the function Priw8 wrote to generate the numeric seed that the game will use when you enter a text seed!

## textFromSeed('number', 'bool')
This one I wrote. The CoH tends to generate large negative integers for the seeds. The problem is you can't enter them as they're more than 10 characters long.
This one lets you enter that large negative number (or any number) and it will attempt to create a text seed which the game will think is that long negative number!

Check out index.js for an example of how to use it!
