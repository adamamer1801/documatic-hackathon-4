import { registerSlashCommands } from "./slash_commands";
registerSlashCommands()

import { Client, CommandInteraction, Intents, Interaction, InviteStageInstance, MessageActionRow, MessageButton, MessageEmbed } from "../node_modules/discord.js";
import { config } from "../config";
import { CheckIfWin, controls, GameArray, getNewGameArray, insertNewBlockAtRandomPos } from "./game";

const Instances: any = {}
/*
    "userId": [gameArray, commandInteraction, moves, time]
*/

const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
]

const ControlRow = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId("left")
            .setLabel("←")
            .setStyle("SECONDARY"),
        new MessageButton()
            .setCustomId("up")
            .setLabel("↑")
            .setStyle("SECONDARY"),
        new MessageButton()
            .setCustomId("down")
            .setLabel("↓")
            .setStyle("SECONDARY"),
        new MessageButton()
            .setCustomId("right")
            .setLabel("→")
            .setStyle("SECONDARY"),
        new MessageButton()
            .setCustomId("end")
            .setLabel("END")
            .setStyle("DANGER")

    )

const colors: string[] = ["⬛", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "⬜"]

const client = new Client({ intents: [intents] })

client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isButton()) {
        if (interaction?.member?.user?.id === undefined) return;
        if (!Instances[interaction?.member?.user?.id]) {
            return;
        }
        let GameArray = Instances[interaction?.member?.user?.id][0]
        let cmdInteraction = Instances[interaction?.member?.user?.id][1]

        if (interaction.customId === "left") {
            GameArray = insertNewBlockAtRandomPos(controls.left(GameArray))
        }
        if (interaction.customId === "down") {
            GameArray = insertNewBlockAtRandomPos(controls.down(GameArray))
        }
        if (interaction.customId === "right") {
            GameArray = insertNewBlockAtRandomPos(controls.right(GameArray))
        }
        if (interaction.customId === "up") {
            GameArray = insertNewBlockAtRandomPos(controls.up(GameArray))
        }
        if (interaction.customId === "end") {
            delete Instances[interaction?.member?.user?.id]
            await cmdInteraction.editReply({
                content: "Goodbye!",
                embeds: [],
                components: []
            })
            return;
        }
         
        if (CheckIfWin(GameArray)) {
            const embed = new MessageEmbed().setTitle("You won!")
            .addField("Time Taken", ((Date.now() -  Instances[interaction?.member?.user?.id][3]) / 1000).toString() + " seconds")
            .addField("Total Moves", Instances[interaction?.member?.user?.id][2].toString())
            .setColor("GREEN")
            cmdInteraction.editReply({ 
                embeds: [embed],
                components: []
            })
            delete Instances[interaction?.member?.user?.id]
        } else {
            await interaction.deferUpdate();
            const embed = new MessageEmbed()
            .setTitle("Game: " + Instances[interaction?.member?.user?.id][2] + " moves")
            .setDescription(renderMessage(GameArray))
            await cmdInteraction.editReply({
                embeds: [embed],
                components: [ControlRow]
            })
            Instances[interaction?.member?.user?.id][2]++
            Instances[interaction?.member?.user?.id][0] = GameArray
        }
    }
    if (interaction.isCommand() && interaction.commandName === "play") {
        if (interaction?.member?.user?.id === undefined) return;
        const GameArray = getNewGameArray()

        const embed = new MessageEmbed()
        .setTitle("Game: 0 moves")
        .setDescription(renderMessage(GameArray))
        await interaction.reply(
            {
                embeds: [embed],
                components: [ControlRow],
                ephemeral: true
            }
        )
        Instances[interaction?.member?.user?.id] = [GameArray, interaction, 1, Date.now()]
    }
})

function renderMessage(gameArray: GameArray): string {
    let returnvalue: string = ""
    for (let i = 0; i != gameArray.length; i++) {
        for (let j = 0; j != gameArray.length; j++) {
            returnvalue += colors[gameArray[i][j]]
        }
        returnvalue += '\n'
    }
    return returnvalue
}


client.on('ready', () => console.log("Bot is running as " + client?.user?.username + "#" + client?.user?.discriminator))
client.login(config.token)
