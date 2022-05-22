import { config } from "../config";

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

// taken from discord.js docs, had no time to write it myself

const startGame = new SlashCommandBuilder().setName("play").setDescription("Start a game")

export function registerSlashCommands() {
    const commands = [startGame];
    const rest = new REST({ version: '9' }).setToken(config.token);
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(config.botId),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}
