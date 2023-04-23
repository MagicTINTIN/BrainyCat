const { dscrd } = require("../")
const interaction = require("../discord/interaction")

module.exports = {
    type: 'slash',
    name: 'help',
    description: 'Get help on how to use this bot',

    execute(info) {
        //console.log(info);
        dscrd.interaction.reply(info.interaction, true, `To use the bot you just have to use /bf command.

You can also save your codes by typing /save *name code (private|publicuse|opensource, optional)*,
> Note if you put it in private, you will only be able to read it but not import it with {YourPseudo.name}.
See the list of code you (you or someone else) created with /list *(PseudoOfTheCreator, optional)*,
Edit read codes with /read *theProgramNameYouWantToRead*, if this program belongs to someone else who put it on opensource you will be able to read with /read *thePseudoOfTheCreator.theProgramNameYouWantToRead*
Edit your codes with /edit *theProgramNameYouWantToEdit*,
Delete codes with /del *theProgramNameYouWantToDelete*.

To save your codes you will need to register one time with /register *yourPseudo*.

When you are executing code put $X to simulate a , entry.
They will be read in the order.
For instance \`,>,. $4$b\` will give you [52|98] and will prompt 'b'
Finally, you can import other codes (even made by other people who put their own code in publicuse or opensource) with **{Pseudo.ModuleName}** in your code
        `)
    }
}
