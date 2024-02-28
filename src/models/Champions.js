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
        require: true,
      },
      competitionDescription: {
        type: String,
        require: true,
      },
      awardDes: {
        type: String,
        require: true,
      },
      image: {
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
      images: {
        type: [String], 
        validate: {
          validator: function (arr) {
            
            return arr.every(url => /^https?:\/\/.+/.test(url));
          },
          message: (props) => `${props.value} contains invalid image URL(s)`,
        },
        trim: true,
      },
    });
    return mongoose.models.Champions || mongoose.model("Champions", champSchema);   // avoid OverwriteModelError
  }

  getInstance() {
    return this.initSchema();

  }
}

module.exports = Champions;
