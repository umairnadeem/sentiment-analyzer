const axios = require('axios');
const Sentiment = require('sentiment');

const getSentiment = query => {
  const sentiment = new Sentiment();
  const subs = 20;
  const comments = 20;
  let promises = [];
  let data = [];

  query = query.replace(/\s/g, '%20');

  return axios.get(`https://www.reddit.com/search.json?q=${query}&sort=top&limit=${subs}`, 'grant_type=client_credentials')
    .then(res => {
      return res.data.data.children
        .filter(child => child.kind === 't3')
        .map(child => child.data.id);
    })
    .then(subs => {
      subs.forEach(sub => {
        promises.push(axios.get(`https://www.reddit.com/comments/${sub}.json?sort=best&limit=${comments}`));
      });
    })
    .then(() => Promise.all(promises))
    .then(results => {
      let score = 0;
      const adj = 30;

      results.forEach(result => {
        result.data.forEach(list => {
          list.data.children.forEach(child => {
            if (child.data.body && child.data.created_utc) {
              let result = sentiment.analyze(child.data.body);
              let adjScore = result.score / (result.words.length || 1);
              score += adjScore;
              if (result.score) {
                data.push({
                  score: adjScore.toFixed(2),
                  words: result.words,
                  date: +child.data.created_utc * 1000
                });
              }
            }
          });
        });
      });

      score = Math.max(Math.min(score / data.length * 20 * (100 / adj), 100), -100);
      return new Promise(resolve => resolve({ score, data }));
    })
    .catch(err => console.error(err));
};

// getSentiment('elon musk')
//   .then(res => console.log(res));

module.exports = getSentiment;