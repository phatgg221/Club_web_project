// Nguoi to chuc
//logo( URL LINK)
//Ten compete
//Locatio
//image URL
//link url

const mongoose = require("mongoose");

class Card{
    initSchema(){
        const cardSchema= new mongoose.Schema({
            organizer:{
                type: String,
                require:true,
                trim:true,
            },
            logoURL:{
                type: String,
                require:true,
                validate: {
                    // use validate to check if the image URL is valid
                    validator: function (v) {
                      const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
                      return v.every(isCorrectImageLink);
                    },
                    message: (props) => `${props.value} is not a valid image URL`,
                  },
                trim: true,
            },
            competitionName:{
                type: String,
                require: true,
                trim: true,
            },
            location:{
                type: String,
                require:true,
                trim:true,
            },
            imageURL:{
                type: String,
                require:true,
                validate: {
                    // use validate to check if the image URL is valid
                    validator: function (v) {
                      const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
                      return v.every(isCorrectImageLink);
                    },
                    message: (props) => `${props.value} is not a valid image URL`,
                  },
                trim: true,
            },
            linkToWeb:{
                type: String,
                require:true,
                validate: {
                    // use validate to check if the image URL is valid
                    validator: function (v) {
                      const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
                      return v.every(isCorrectImageLink);
                    },
                    message: (props) => `${props.value} is not a valid image URL`,
                  },
                trim: true,
            }
        });

        return mongoose.model("Card",cardSchema);
    }
    getInstance(){
        this.initSchema();
        return mongoose.model("Card");
    }
}

module.exports= Card;