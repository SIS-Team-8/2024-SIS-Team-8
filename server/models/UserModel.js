const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "An username address is required"],
        unique: true,
    },
    //user_type: Number,              // 0: admin, 1: user
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },

    password:{
        type: String,
        required: [true, "An password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    journal: [
        {
            _id: String,
            time_code: [Date],
            emoji: String,      // change to int     // 0: happy, 1: sad, 2: angry, 3: anxious, 4: tired, 5: excited, 6: relaxed
            text: String,
            image: String
        }
    ]
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);