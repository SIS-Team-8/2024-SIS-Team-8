const User = require("../models/UserModel");

// journal: [
//         {
//             time_code: {
//                 type: Date,
//                 required: [true, "A journal time code is required"]
//             },
//             emoji: {
//                 type: Number, // 0: happy, 1: sad, 2: angry, 3: anxious, 4: tired, 5: excited, 6: relaxed
//                 required: [true, "A journal emoji is required"]
//             },     
//             intensity: {
//                 type: Number,           // 0-4
//                 required: [true, "A journal emoji intensity is required"]
//             },
//             text: String,
//             image: String
//         }
//     ]

module.exports.logEmote = async (req, res) => {
    try {
        const {emoji, intensity, text, image} = req.body;
        const username = req.authenticatedUser;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const time_code = new Date();

        user.journal.push({ time_code, emoji, intensity, text, image });

        const updatedUser = await user.save();

        if (!updatedUser) {
            return res.status(404).json({ message: "failed to update journal" });
        }

        res.status(200).json({ message: "Journal updated successfully", journal: updatedUser.journal });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};