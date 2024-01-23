// tai khoan mat khau

const { default: mongoose, model } = require("mongoose");

class Account{
    initSchema(){
        const accountSchema= new mongoose.Schema({
            username:{
                type: String,
                required: true,
                // validate if the studentID is in the correct format (sXXXXXXX)
                validate: function (v) {
                    // check if the studentID starts with s
                    // check if the studentID has 8 digits
                    return (
                        v.startsWith("s") &&
                        v.length === 8 &&
                        !isNaN(v.substring(1, 8))
                    );
                },
            },
            password:{
                type: String,
                require:true,
            },
        });
        return mongoose.model("Account", accountSchema);
    }
    getInstance() {
        return this.initSchema(); 
      }
}

module.exports= Account;