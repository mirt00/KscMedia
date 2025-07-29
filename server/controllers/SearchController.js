import User from "../models/userModel.js"; // Ensure the path is correct

const searchUsers = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid search keyword. It must be a string.",
      });
    }

    const regEx = new RegExp(keyword, "i"); // case-insensitive

    const searchQuery = {
      $or: [
        { username: regEx },
        { firstname: regEx },
        { lastname: regEx },
        { email: regEx },
      ],
    };

    const user = await User.findOne(searchQuery).select("-password"); // 🔹 Find only one user

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that keyword.",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Search users error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default searchUsers;
