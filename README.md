# 2048, but with colors 
### with some gameplay changes to make it easier

The only modules used are Discord.js and the ones necessary to implement Slash Commands, as well as ts-node (to run).

Remember to run `npm install` and setup your Discord Bot Token and Discord Bot ID in the config.json prior to running the bot

To begin, run the bot (`npm start`) and use `/play`. You will be given a 5x5 grid of black squares and one red square. 

There are 4 moves: up, down, left and right. All of these, move every block by one grid-block to the movement that you select, which is where the challenge comes in.

Every move, a new red square will appear in a random spot. You have to get these 2 red squares to merge with each other, to get a orange square. 2 oranges make a yellow, 2 yellows make a green, 2 greens make a blue, 2 blues make a purple, and 2 purples make a white, where you win the game.

It's in the order of the rainbow, for less confusion. Had to make due with what emojis I had (since I couldn't use numbers)

It's easier than you think.

Personal best is 90 moves and 169 seconds :)
