const { dscrd } = require("../")
const interaction = require("../discord/interaction")

module.exports = {
    type: 'slash',
    name: 'list',
    description: 'Get the list of the programs of a user (default: you)',
    options: [
        {
            required: false,
            type: "string",
            name: "pseudo",
            description: "Pseudo of the creator",
            min: 5,
            max: 20,
        },
    ],
    execute(info) {
        //console.log(info);
        dscrd.interaction.reply(info.interaction, true, `To use the bot you just have to use /bf command.

You can also save your codes by typing /save *(private|publicuse|opensource, optional)*,
See the list of code you (you or someone else) created with /list *(PseudoOfTheCreator, optional)*,
Edit read codes with /read *theProgramNameYouWantToRead*, if this program belongs to someone else who put it on opensource you will be able to read with /read *thePseudoOfTheCreator.theProgramNameYouWantToRead*
Edit your codes with /edit *theProgramNameYouWantToEdit*,
Delete codes with /del *theProgramNameYouWantToDelete*.

To save your codes you will need to register one time with /register *yourPseudo*.

Finally, you can import other codes (even made by other people who put their own code in publicuse or opensource) with **{Pseudo.ModuleName}** in your code
        `)
    }
}
