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