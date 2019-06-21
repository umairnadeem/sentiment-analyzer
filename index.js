const axios = require('axios');
const Sentiment = require('sentiment');

const getSentiment = query => {
  const sentiment = new Sentiment();
  let promises = [];
  let comments = [];

  query = query.replace(/\s/g, '%20');
  
  return axios.get(`https://www.reddit.com/search.json?q=${query}&sort=top&limit=10`, 'grant_type=client_credentials')
    .then(res => {
      return res.data.data.children
        .filter(child => child.kind === 't3')
        .map(child => child.data.id);
    })
    .then(subs => {
      subs.forEach(sub => {
        promises.push(axios.get(`https://www.reddit.com/comments/${sub}.json?sort=best&limit=10`));
      });
    })
    .then(() => Promise.all(promises))
    .then(results => {
      let score = 0;
      let count = 0;
  
      results.forEach(result => {
        result.data.forEach(list => {
          list.data.children.forEach(child => {
            if (child.data.body) comments.push(child.data.body)
          });
        });
      });
      comments.forEach(comment => {
        let result = sentiment.analyze(comment);
        count += result.score ? 1 : 0;
        score += result.score / (result.words.length || 1);
      });
      return new Promise(resolve => resolve(score/count * 20));
    })
    .catch(err => console.error(err));
};

getSentiment('elon musk')
  .then(res => console.log(res));