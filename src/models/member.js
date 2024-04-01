const { default: mongoose, model } = require("mongoose");

class Account {
    initSchema() {
        const accountSchema = new mongoose.Schema({
            email: {
                type: String,
                validate: {
                    validator: function (v) {
                        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/;
                        return emailRegex.test(v);
                    }
                },
            },
            username: {
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
            password: {
                type: String,
                require: true,
            },
            isAdmin: {
                type: Boolean,
                required: true,
                default: false,
            }
            
        });
        return mongoose.models.Account || mongoose.model("Account", accountSchema);
    }
    getInstance() {
        return this.initSchema();
    }
}

module.exports = Account;