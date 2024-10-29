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


module.exports.requestJournal = async (req, res) => {
    try
    {
        const {startDate, endDate} = req.body;
        const username = req.authenticatedUser;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let journal = user.journal;
        let requestedJournal = [];
        let startTimestamp = new Date(startDate);
        let endTimestamp = new Date(endDate);

        for (let i = 0; i < journal.length; i++)
        {
            if (journal[i].time_code >= startTimestamp && journal[i].time_code <= endTimestamp)
            {
                requestedJournal.push(journal[i]);
            }
        }

        if (requestedJournal.length === 0)
        {
            return res.status(404).json({ message: "No journal entries found" });
        }
        res.status(200).json({ message: "Journal fetched successfully", journal: requestedJournal });
        

    } catch (error)
    {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};