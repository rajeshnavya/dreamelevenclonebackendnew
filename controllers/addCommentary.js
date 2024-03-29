const Match = require("../models/match");
const request = require("request");
const Contest = require("../models/contest");
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

module.exports.addcommentary = async function () {
  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  let obj = {
    results: [],
  };
  var date = new Date();
  var month = pad2(date.getMonth() + 1); //months (0-11)
  var day = pad2(date.getDate()); //day (1-31)
  var year = date.getFullYear();
  // var year = "2021";
  // var month = "09";
  // var day = 25;
  var formattedDate = 2023 + "-" + 01 + "-" + 13;
  const numberOfDays = 4;
  let getim = new Date().getTime();

  const axios = require("axios");

  const matches = await Match.find();

  const options = {
    method: "GET",
    url: "https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/66285/comm",
    headers: {
      "X-RapidAPI-Key": "3ddef92f6emsh8301b1a8e1fd478p15bb8bjsnd0bb5446cadc",
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(async function (response) {
      console.log(response.data, "helbeda");
      let gnu = [];
      const ms = await MatchLiveDetails.findOne({
        matchId: "2719011",
      });
      response.data.commentaryList.forEach((e) =>
        ms.commentary.push({
          comment_text: e?.commText ? e.commText : "",
          eventType: e?.event ? e.event : "",
          over: e?.overNumber ? e.overNumber : "",
        })
      );
      await ms.save();
    })
    .catch(function (error) {
      console.error(error);
    });

  // Doubt in this part, is request is synchronous or non synchronous?
};
