const Match = require("../models/match");
const request = require("request");
const Team = require("../models/team");
const Contest = require("../models/contest");
const User = require("../models/user");
const MatchLiveDetails = require("../models/match_live_details_new");

// function prizeBreakupRules(prize, numWinners){
//     let prizeMoneyBreakup = [];
//     for(let i = 0; i < numWinners; i++){

//     }
// }

function compare(a, b) {
  return a.date < b.date;
}

function getplayerImage(name) {
  const options = {
    method: "GET",
    url: `https://cricket.sportmonks.com/api/v2.0/players/?filter[lastname]=${name}&api_token=
        fTWhOiGhie6YtMBmpbw10skSjTmSgwHeLg22euC5qLMR1oT1eC6PRc8sEulv`,
    headers: {
      "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
      "x-rapidapi-key": "773ece5d2bmsh8af64b6b53baed6p1e86c9jsnd416b0e51110",
      api_token: "fTWhOiGhie6YtMBmpbw10skSjTmSgwHeLg22euC5qLMR1oT1eC6PRc8sEulv",
      useQueryString: true,
    },
    Authorization: {
      api_token: "fTWhOiGhie6YtMBmpbw10skSjTmSgwHeLg22euC5qLMR1oT1eC6PRc8sEulv",
    },
  };
  let s = "";
  request(options, function (error, response, body) {
    s = JSON.parse(body);
  });
  return s;
}

module.exports.addMatchIds = async function () {
  const matches = await MatchLiveDetails.find();
  const users = await User.find();
  for (let x = 0; x < users.length; x++) {
    for (let i = 0; i < matches.length; i++) {
      let teams = await Team.find({
        $and: [{ matchId: matches[i].matchId }, { userId: users[x]._id }],
      });
      if (teams.length > 0) {
        users[x].matchIds.push(matches[i].matchId);
        await users[x].save();
      }
    }
  }
};
