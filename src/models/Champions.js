
const mongoose = require("mongoose");

class Champions {
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
          image: [
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
    return mongoose.model("Champions", champSchema); 
  }

  getInstance() {
    return this.initSchema(); 
  }
}

module.exports = Champions;
