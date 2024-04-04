const mongoose = require('mongoose');

class Sample{
    constructor(){
        if(!Sample.instance){
            this.initSchema();
            Sample.instance=this;
        }
        return Sample.instance;
    }

    initSchema(){
        const sampleSchema= new mongoose.Schema({
            sampleName:{
                type: String,
                require: true,
            },
            sampleContents:{
                type: String,
                require: true,
            },
            sampleAuthor:{
                type: String,
                require: true,
            },
            sampleLink:{
                type: String,
                validate: {
                    validator: function (v) {
                      const isCorrectImageLink = (currentValue) => /^https?:\/\/.+/.test(currentValue);
                      return isCorrectImageLink(v);
                    },
                    message: (props) => `${props.value} is not a valid image URL`,
                  },
                require: true,
            },
        });

        return mongoose.models.Sample || mongoose.model("Sample", sampleSchema);
    }

    getInstance(){
        return this.initSchema();
    }
}

module.exports= Sample;