let dogs = [
  {
    name: "Tumme",
    type: "Dog",
    breed: "Cocker Spaniel",
    gender: "Male",
    age: 2,

    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikesStr}`;
      }
    },
    comment: "Likes to get his tummy rubbed",
    img_url:
      "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rat",
    type: "Dog",
    breed: "French Bulldog",
    gender: "Female",
    age: 3,

    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikesStr}`;
      }
    },
    comment: "Looks like a rat sometimes",
    img_url:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bard",
    type: "Dog",
    breed: "Golden Retriever",
    gender: "Female",
    age: 5,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikesStr}`;
      }
    },
    comment: "Soft, likes to cuddle",
    img_url:
      "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?q=80&w=1362&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ruff Ruff",
    type: "Dog",
    breed: "Yorkshire Terrier",
    gender: "Female",
    age: 1,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikesStr}`;
      }
    },
    comment: "Small but dangerous",
    img_url:
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Bestie",
    type: "Dog",
    breed: "Samoyed",
    gender: "Female",
    age: 5,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikesStr}`;
      }
    },
    comment: "Always a little extra",
    img_url:
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

let cats = [
  {
    name: "Bluff",
    type: "Cat",
    breed: "American Shorthair",
    gender: "Female",
    age: 3,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikesStr}`;
      }
    },
    comment: "Hiss 24/7",
    img_url:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Headlights",
    type: "Cat",
    breed: "Persian",
    gender: "Female",
    age: 6,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikesStr}`;
      }
    },
    comment: "Eyes Wide Heads Empty",
    img_url:
      "https://images.unsplash.com/photo-1548366086-7f1b76106622?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Yawny",
    type: "Cat",
    breed: "American Shorthair",
    gender: "Male",
    age: 1,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: false,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikeStr}`;
      }
    },
    comment: "Eyes Wide Heads Empty",
    img_url:
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Tartarus",
    type: "Cat",
    breed: "Abyssus",
    gender: "Male",
    age: 4,
    friendlyTo: {
      children: true,
      dogs: false,
      cats: true,
    },
    friendliness: function () {
      if (
        this.friendlyTo.children &&
        this.friendlyTo.dogs &&
        this.friendlyTo.cats
      ) {
        return "Friendly";
      } else {
        let dislikeStr = "";
        if (this.friendlyTo.children) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += "children";
        }
        if (this.friendlyTo.dogs) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " dogs";
        }
        if (this.friendlyTo.cats) {
          if (dislikeStr !== "") {
            dislikeStr += "& ";
          }
          dislikeStr += " cats";
        }

        return `dislike${dislikeStr}`;
      }
    },
    comment: "Got his name from the dark abyss of Tartarus",
    img_url:
      "https://images.unsplash.com/photo-1571566882372-1598d88abd90?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
];
export let pets = [...dogs, ...cats];
