class Message {
    constructor(name, text, id) {
      this.name = name;
      this.text = text;
      this.id = id;
      this.time = new Date().toString().slice(15, 24);
      // this.seen = false
    }

   }
    
   module.exports = () => {
    return Message
   }