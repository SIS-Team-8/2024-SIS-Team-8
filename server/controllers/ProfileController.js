const User = require("../models/UserModel");

module.exports.updateProfile = async (req, res) => {
    try {
        //console.log("Updating user profile");
        const username = req.authenticatedUser; // Grab the username from the authenticated user
        const { name, email, phone, address } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        //console.log(`Updating profile for user: ${username}`);
        // Update the user's profile information
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.address = address;

        const updatedUser = await user.save();

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};