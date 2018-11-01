
class Queue {

    constructor(){
        this.data = [];
    }
    
    add(data) {
        this.data.unshift(data)
    };
    remove(){
        return this.data.pop();
    }
    size(){
        return this.data.length;
    }
    isEmpty(){
        return (this.data.length == 0 ? true : false)
    }
    peek(){
        return this.data[this.data.length - 1]
    }
    flush(){ //Idea slice by amount
        this.data = []
    }

}

module.exports = Queue;