//Shuts down the bot
exports.run = (client, message, args, tools) => {
    const dance = client.emojis.find(emoji => emoji.name == 'dance');
    try {
        message.channel.send('**Sounds gay** ' + dance)
    } catch (err){
        console.log(err.stack);
    }
}