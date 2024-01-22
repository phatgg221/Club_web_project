//name
//contents
//image URL
// will be more

const mongoose = require("mongoose");

class Tips{
    initSchema(){
        const tipSchema= new mongoose.Schema({
            tipName:{
                type: String,
                require: true,
            },
            
        })
    }
}