const mongoose = require("mongoose");

class Champions {
  constructor() {
    // Check if mongoose and modelSchemas are defined
    if (mongoose && mongoose.modelSchemas && mongoose.modelSchemas['Champions']) {
      delete mongoose.modelSchemas['Champions'];
    }

    // Initialize the schema and create the model
    this.initSchema();
  }

  initSchema() {
    const champSchema = new mongoose.Schema({
      teamName: {
        type: String,
        required: true,
      },
      competitionDescription: {
        type: String,
        required: true,
      },
      awardDes: {
        type: String,
        required: true,
      },
      images: [
        {
          type: [String],
          validate: {
            validator: function (v) {
              const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
              return v.every(isCorrectImageLink);
            },
            message: (props) => `${props.value} is not a valid image URL`,
          },
          trim: true,
        },
      ],
    });

    // Create the "Champions" model
    this.ChampionsModel = mongoose.model("Champions", champSchema);
  }

  getInstance() {
    // Return the model instance
    return this.ChampionsModel;
  }
}

module.exports = Champions;
