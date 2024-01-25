const mongoose = require("mongoose");

class Card {
  constructor() {
    if (!Card.instance) {
      this.initSchema();
      Card.instance = this;
    }

    return Card.instance;
  }

  initSchema() {
    // Your existing schema definition
    const cardSchema = new mongoose.Schema({
      organizer: {
        type: String,
        required: true,
        trim: true,
      },
      logoURL: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
            return isCorrectImageLink(v);
          },
          message: (props) => `${props.value} is not a valid image URL`,
        },
        trim: true,
      },
      competitionName: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        required: true,
        trim: true,
      },
      imageURL: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
            return isCorrectImageLink(v);
          },
          message: (props) => `${props.value} is not a valid image URL`,
        },
        trim: true,
      },
      linkToWeb: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
            return isCorrectImageLink(v);
          },
          message: (props) => `${props.value} is not a valid image URL`,
        },
        trim: true,
      },
    });

   
    this.CardModel = mongoose.model("Card", cardSchema);
  }

  getInstance() {
    
    return this.CardModel;
  }
}

module.exports = Card;
