const models = require("../models");

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "User's id is required!" })

    const foundUser = await models.User.findOne({ where: { id } });
    if (!foundUser) return res.status(400).json({ error: "User not found" })

    await models.User.destroy({ where: { id: foundUser.id } });
    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.log("Error deleting user, ", error);
    res.status(400).json({ error: "Error deleting user, " + error })
  }
}

module.exports = { deleteUser }