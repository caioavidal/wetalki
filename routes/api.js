var languages = require('../domain/data/languages.js');

exports.languages = function (req, res) {
 
  res.json(languages);
};