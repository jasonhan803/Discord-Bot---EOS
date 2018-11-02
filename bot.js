const config = require('./config.json');
const Discord = require('discord.js');
var Queue = require('./queue.js')
const system = require('./system.js');
const terminal = require('./terminal/terminal.js'); /* Not needed */
const roles = require('./roles.js'); /* Not needed */

const bot = new Discord.Client();

terminal.run(bot); //Running terminal interface
queue = new Queue(); //Message Queue
system.run(queue); //Run the Queue system with the Queue

var messageChannel = null
const prefix = '/';

bot.on('message', message => {
    if(message.author.bot) return;

    //Check string length (Must be less than or equal to 10240)
    let content = { //Content object
        message: message.content,
        url: '',
        type: '',
        display: ''
    };

    if(message.attachments.size > 0){
        console.log('posted as attachments')
        var Attachment = (message.attachments).array();
        content.url = Attachment[0].url
        var extention = content.url.split('.').pop(); //Check the attachment type
        if(extention == 'mp3'){
            content.display = 'mp3'
            
        } else {
            content.display = 'img'
        }
        content.type = 'url'
    }
    if(message.embeds.length > 0){
        console.log('posted as embed')
        var Embed = message.embeds[0];
        content.type = 'url';
        
        if(Embed.type == 'video'){
            content.url = Embed.url;
            content.display = 'mp4';
        }
        if(Embed.type == 'image'){
            content.url = Embed.url;
            content.display = 'img'
        }
        
    }
    queue.add(content)
    
    //Command handler
    /*
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    
    if(message.author.presence.status == 'offline') {
        const bruh = bot.emojis.find(emoji => emoji.name == 'bruh');
        message.channel.send('Why are you typing when you are offline ' + message.author + ' ' + bruh)
        return;
    }
    if(!message.content.startsWith(prefix)){
        return;
    }
    if(!validate(cmd)) return message.channel.send('That doesnt look like a cmd'); //Ensure other directory's arent accessed

    try {
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(bot, message, args);
    } catch (err) {
        console.log(err.stack)
        //console.log("Command does not exist or has resuletd in error");
        message.channel.send('Command does not exist')
    }
    */
});

bot.on('ready', () => {
    console.log(config.bots[id].name + ' Bot Started');
    
    var guild = bot.guilds.find(guild => guild.name === 'Pepe Guild') //Get the server collection
    var server = bot.channels.array().sort(); //Ignore
    var category = guild.channels.filter(category => category.type === 'category'); //Get the category collection
    var generalCategory = category.filter(category => category.name === 'General Discussion') //Get the general discussion category channel
    var generalCategoryId = generalCategory.firstKey() //Get the default message channel; .pop() because ik there is only one
    // Create the cateogry channel object then get the children
    var generalChannel = bot.channels.get(generalCategoryId).children.filter(channel => channel.name === 'general').filter(channel => channel.type === 'text');
    //Now create the main messaging channel object for global use
    messageChannel = bot.channels.get(generalChannel.firstKey())
    //console.log(messageChannel)
    //messageChannel.send('Feels good man')

    //Get the list of all the channel id's in the general category
    bot.channels.get(generalCategoryId).children.keyArray().forEach(channelId => {
        let channel = bot.channels.get(channelId)
        //console.log(channel.type + ' - ' + channel.name + ' - ' + channel.id)
    });
    
    //Get the roles in the server
    //console.log(roles.run(bot))

    
});

bot.on('disconnect', event => {
    console.log('Bot Disconnected');
    messageChannel.send('Feels bad man')
});

bot.on('presenceUpdate', (oldMember, newMember) =>{
    let status = newMember.user.presence.status
    if(status == 'offline'){
        messageChannel.send(newMember.user.username + ` has went ` + newMember.user.presence.status)
    }
    
});

var id = 0;
bot.login(config.bots[id].key);

function validate(cmd){
    if(cmd.indexOf("/") > -1 ){
        return false;
    }
    return true;
}