const pool = require('../models/db');

const getUserScores = async (req, res) => {
  const userId = req.params.userId;
  try {
    const scoreResult = await pool.query('SELECT score FROM scores WHERE user_id = $1', [userId]);
    const totalScoreResult = await pool.query('SELECT SUM(score) AS totalScore FROM scores');
    const rankResult = await pool.query('SELECT user_id, RANK() OVER (ORDER BY score DESC) as rank FROM scores');

    const score = scoreResult.rows[0]?.score || 0;
    const totalScore = totalScoreResult.rows[0]?.totalscore || 0;
    const rank = rankResult.rows.find(r => r.user_id === userId)?.rank || 'N/A';

    res.status(200).json({ score, totalScore, rank });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scores', error });
  }
};

module.exports = { getUserScores };
