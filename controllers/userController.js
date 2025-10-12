const { getUserLeaderBoard } = require("../service/userService")
const { StatusCodes } = require("../enums")

async function getLeaderBoard(req, res) {
  try {
    const query = req.query;
    const leaderBoardResponse = await getUserLeaderBoard(query);
    res.status(StatusCodes.Ok).json(leaderBoardResponse);
  } catch (err) {
     const errorStatusCode = err.statusCode ?? StatusCodes.InternalServerError
    res.status(errorStatusCode).json({ isSuccess: false, error: err?.message });
  }
}

module.exports = {
  getLeaderBoard
}