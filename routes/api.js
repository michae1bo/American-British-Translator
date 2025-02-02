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
            response = "a to b";
          } else if (locale === 'british-to-american') {
            response = 'b to a';
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
