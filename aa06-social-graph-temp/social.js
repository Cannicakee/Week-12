// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID += 1;
    this.users[this.currentID] = { id: this.currentID, name: name };
    this.follows[this.currentID] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    if (!this.users[userID1] || !this.users[userID2]) {
      return false;
    }
    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    if (!this.users[userID]) {
      return null;
    }
    return Array.from(this.follows[userID]);
  }

  getFollowers(userID) {
    if (!this.users[userID]) {
      return null;
    }
    const followers = new Set();
    for (const followerID in this.follows) {
      if (this.follows[followerID].has(userID)) {
        followers.add(parseInt(followerID));
      }
    }
    return Array.from(followers);
  }

  getRecommendedFollows(userID, degrees) {
    if (!this.users[userID] || degrees < 1) {
      return [];
    }

    const visited = new Set([userID]);
    const queue = [{ id: userID, level: 0 }];
    const recommended = new Set();

    while (queue.length > 0) {
      const { id, level } = queue.shift();

      if (level < degrees) {
        this.follows[id].forEach(followID => {
          if (!visited.has(followID)) {
            visited.add(followID);
            queue.push({ id: followID, level: level + 1 });

            if (level + 1 === degrees && followID !== userID && !this.follows[userID].has(followID)) {
              recommended.add(followID);
            }
          }
        });
      }
    }

    return Array.from(recommended);
  }
}

module.exports = SocialNetwork;
