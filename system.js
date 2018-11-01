/*
    Controls the queue's posting
*/
const post = require('./post.js');

exports.run = (queue) => {
    var intv_process = setInterval(process, 1000);
    var next_process = 0; //Next process time

    function process(){
        var now = (new Date()).getTime();
        if(queue.size() > 0 && now > next_process){
            
            //Replace this with the posting function
            let content = queue.remove()
            console.log('posting: ' + content)
            post.run(content);

            next_process = now + (1000 * 60 * 3)// Schedule for 3 minutes
            
        }
        if(queue.size() == 0){
            console.log("Nothing to post atm") //*** Turn off for release ***
        }
    }
}