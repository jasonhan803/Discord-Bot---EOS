/**
 * Get roles from a server
 * 
 */
exports.run = (bot) => {
    roleArray = []
    bot.guilds.find(guild => guild.name === 'Pepe Guild').roles.array().sort().forEach(role => {
        
        roleArray.push({
            id: role.id, 
            name: role.name, 
            rank: role.position
        })
    });
    return roleArray
}