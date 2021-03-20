const Users = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    //Get user infomation by id
    const user = await Users.findOne({
      _id: req.user.id,
    });
    if (user.role === 0)
      return res.status(400).json({
        msg: "Admin resources access denied. You do not have enough access!",
      });
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
