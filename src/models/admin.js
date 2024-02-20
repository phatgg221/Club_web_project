const mongoose = require('mongoose');



class Admin{
    constructor(){
        if(!Admin.instance){
            this.initSchema();
            Admin.instance= this;
        }
        return Admin.instance;
    }


    initSchema(){
        const adminSchema= new mongoose.Schema({
            adminUsername:{
                type:String,
                require: true,
            },
            adminPassword:{
                type:String,
                require: true
            }
        });

        return mongoose.models.Admin || mongoose.model("Admin", adminSchema);
    }

    getInstance(){
        return this.initSchema();
    }
}

module.exports= Admin;