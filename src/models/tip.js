

const mongoose = require("mongoose");

class Tips{
    initSchema(){
        const contentSchema= new mongoose.Schema({
            name:{
                type:String,
                require: true,
            },
            contents: {
                type: String,
                required: true,
            },
            tipImage: {
                type: String,
                validate: {
                    validator: function (v) {
                      const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
                      return isCorrectImageLink(v);
                    },
                    message: (props) => `${props.value} is not a valid image URL`,
                  },
            },
        })
        const tipSchema= new mongoose.Schema({
            tipName:{
                type: String,
                require: true,
            },
            tipsLink: {
                type: String,
                validate: {
                    validator: function (v) {
                      const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
                      return isCorrectImageLink(v);
                    },
                    message: (props) => `${props.value} is not a valid image URL`,
                  },
            
            },
            
            realContent: [contentSchema]
        });

        return mongoose.models.Tips || mongoose.model("Tips", tipSchema);
    }

    getInstance(){
        return this.initSchema();
    }
}

module.exports= Tips;