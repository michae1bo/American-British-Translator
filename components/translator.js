const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    americanToBritish(americanString) {
        const americanTimeRegex = /[0-9][0-9]?:[0-9][0-9]/g;
        let britishString = americanString;
        const timeMatches = [...britishString.matchAll(americanTimeRegex)]
        timeMatches.forEach(match => {
            const oldTime = match[0]
            const index = match['index'];
            let newTime;
            if (oldTime.length === 4) {
                newTime = oldTime[0] + '.' + oldTime[2] + oldTime[3];
            } else {
                newTime = oldTime[0] + oldTime[1] + '.' + oldTime[3] + oldTime[4];
            }
            britishString = britishString.slice(0, index) + newTime + britishString.slice(index + oldTime.length);
        });


        if (americanString === britishString) {
            britishString = "Everything looks good to me!";
        }
        return britishString;
    }

    britishToAmerican(britishString) {
        return ""
    }

    highlightTranslation(original, translated) {
        const originalArray = original.split(' ');
        const translatedArray = translated.split(' ');
        for (let i = 0; i < translatedArray.length; i++) {

            if (originalArray[i] !== translatedArray[i]) {
                console.log(originalArray[i], translatedArray[i])
                if (translatedArray[i].slice(-1) === '.') {
                    translatedArray[i] = '<span class="highlight">' + translatedArray[i].slice(0, -1) + '</span>' + '.';
                } else {
                    translatedArray[i] = '<span class="highlight">' + translatedArray[i] + '</span>';
                }
                console.log(translatedArray[i])
            }
        }
        return translatedArray.join(' ');
    }

}

module.exports = Translator;