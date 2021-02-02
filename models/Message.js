/*
*
*Aditia Dwi Pratomo 1942806
*Erio Hermawan 1942808
*
*
*/
class Message {
    constructor(name, text, id) {
      this.name = name;
      this.text = text;
      this.id = id;
      this.time = new Date().toString().slice(15, 24);
    }
  }
  
  module.exports = () => {
    return Message
  }