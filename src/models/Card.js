const ENUM = require("../constant/enum");
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
      competitionDate: {
        type: Date,

      },
      competitionStatus: {
        type: String,
        default: ENUM.competitionStatus.incoming,
      }
    });

   
    return mongoose.models.Card || mongoose.model("Card",cardSchema);
  }

  getInstance() {
    
    return this.initSchema();
  }
}

module.exports = Card;
