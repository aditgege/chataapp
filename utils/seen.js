class SeenDB {
    constructor() {
      this.seen = [];
    }
  
    addSeen(seen) {
      this.seen = [...this.seen, seen];
    }

    getAllSeen() {
      return this.seen
    }
  
    getSeen(id) {
      return this.seen.find((seen) => seen.id === id);
    }
  
    getSeenByRoom(room) {
      return this.seen.filter((seen) => seen.room === room);
    }
  
    removeSeen(id) {
      this.seen = this.seen.filter((seen) => seen.id !== id);
    }
  }
  
  module.exports = () => {
    return new SeenDB();
  };
  