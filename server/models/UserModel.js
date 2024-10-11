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
            time_code: {
                type: Date,
                required: [true, "A journal time code is required"]
            },
            emoji: {
                type: Number, // 0: happy, 1: sad, 2: angry, 3: anxious, 4: tired, 5: excited, 6: relaxed
                required: [true, "A journal emoji is required"]
            },     
            intensity: {
                type: Number,           // 0-4
                required: [true, "A journal emoji intensity is required"]
            },
            text: String,
            image: String
        }
    ]
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);