
const post = require('./post.js');

exports.run = (queue) => {
    var intv_process = setInterval(process, 1000);
    var next_process = 0; //Next process time

    async function process(){

        var now = (new Date()).getTime();
        console.log('Now ' + now + ' next: ' + next_process + ' Current Queue Size: ' + queue.size())

        if(queue.size() > 0 && now > next_process){
            

            //Replace this with the posting function
            let content = queue.peek()
    
            let result = await post.run(content)
        
            if(result == 1){
                next_process = now + (1000 * 60 * 3)// Schedule for 3 minutes
                queue.remove()
            } else if (result > 1){
                next_process = now + (1000 * result)// Schedule for 3 minutes
                console.log("waiting " + result + " seconds")
            }

        }
        if(queue.size() == 0){
            console.log("Nothing to post atm") //*** Turn off for release ***
        }
    }
}