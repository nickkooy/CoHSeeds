# CoHSeeds
CoH tends to generate large negative integers for the seeds. The problem is that they're more than 10 characters long - so you can't enter them!

Here's 2 functions to help with that!

### seedFromText('string')
Priw8 wrote this one!
If you ender in a text seed, CoH will secretly generate a integer for the seed (sneaky!). This function will figure out that seed! So you can find/test text seed. It's neat!

### textFromSeed('number', 'bool')
This one lets you enter that large negative number (or any number) and it will attempt to find a text seed which the game will think is that long negative number!
It's sort of the reverse of Priw8's function.

Check out index.js for an example of how to use it!


Note:
Not all numbers can turn into text seeds, so it can fail. If you find one of those let me know! I'll see if I can make the function a bit safer to use :)

Check out this fiddle too:
https://jsfiddle.net/0zx7rfjc/4/
