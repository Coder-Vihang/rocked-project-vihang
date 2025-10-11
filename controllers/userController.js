const { getUserLeaderBoard } = require("../service/userService")

async function getLeaderBoard(req, res) {
  try {
    const query = req.query;
    const leaderBoardResponse = await getUserLeaderBoard(query);
    res.status(200).json(leaderBoardResponse);
  } catch (err) {
    res.status(500).json({ isSuccess: false, error: err?.message });
  }
}

module.exports = {
  getLeaderBoard
}