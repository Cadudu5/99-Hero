const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    codeName: {
        type: String,
        required: true,
        unique: true,
    },

    realName: {
        type: String,
        required: true,
        select: false,
    
    },


    disasters: {
        type: [String],
        required: true, 
        default: undefined
    },

    city: [{
        type: String,
        required: true,
    }],

    TeamWork:{
        type: String,

    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
