'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let response;
      if(req.body.text !== undefined && req.body.locale !== undefined) {
        const locale = req.body.locale;
        const text = req.body.text;
        if (text !== "") {
          if (locale === 'american-to-british') {
            let translation = translator.americanToBritish(text);
            translation = translator.highlightTranslation(text, translation);
            response = { text, translation };
          } else if (locale === 'british-to-american') {
            let translation = translator.britishToAmerican(text);
            translation = translator.highlightTranslation(text, translation);
            response = { text, translation };
          } else {
            response = { error: 'Invalid value for locale field' };
          }
        } else {
          response = { error: 'No text to translate' };
        }
      } else {
        response = { error: 'Required field(s) missing' };
      }
      res.json(response);
    });
};
