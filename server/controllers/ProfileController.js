const User = require("../models/UserModel");

module.exports.updateProfile = async (req, res) => {
    try {
        //console.log("Updating user profile");
        const username = req.authenticatedUser; // Grab the username from the authenticated user
        const { name, phone, address, profile_pic} = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        //console.log(`Updating profile for user: ${username}`);
        // Update the user's profile information
        user.name = name;
        user.phone = phone;
        user.address = address;
        user.profile_pic = profile_pic;

        const updatedUser = await user.save();

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.getProfile = async (req, res) => {
    try {
        const username = req.authenticatedUser;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile fetched successfully", user: user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.updatePassword = async (req, res) => {
    try {
        const username = req.authenticatedUser;
        const { password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = password;

        const updatedUser = await user.save();

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Password updated successfully" });

    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};