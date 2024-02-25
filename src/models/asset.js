const mongoose= require("mongoose");
var ENUM = require("@/constant/enum");

class Asset{
    constructor(){
        if(!Asset.instance){
            this.initSchema();
            Asset.instance=this;
        }
        return Asset.instance;
    }

    initSchema(){
        const assetSchema= new mongoose.Schema({
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId(),
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
              name: {
                type: String,
                required: true,
              },
              assetType: {
                type: String,
                enum: ENUM.cloudinaryType,
              },
        });

        return mongoose.models.Asset || mongoose.model("Asset", assetSchema);
    }

    getInstance(){
        return this.initSchema();
    }
}

module.exports= Asset;