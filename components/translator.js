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

        for (let americanWord in americanOnly) {
            const wordMatches = [...britishString.toLowerCase().matchAll(americanWord)];
            wordMatches.forEach(match => {
                const index = match['index'];
                if (britishString[index + americanWord.length] === " " || britishString[index + americanWord.length] === "." || britishString[index + americanWord.length] === "?" || britishString[index + americanWord.length] === "!") {
                    britishString = britishString.slice(0, index) + americanOnly[americanWord] + britishString.slice(index + americanWord.length);
                }
                
            })
        }

        for (let americanWord in americanToBritishSpelling) {
            const wordMatches = [...britishString.toLowerCase().matchAll(americanWord)];
            wordMatches.forEach(match => {
                const index = match['index'];
                if (britishString[index + americanWord.length] === " " || britishString[index + americanWord.length] === "." || britishString[index + americanWord.length] === "?" || britishString[index + americanWord.length] === "!") {
                    britishString = britishString.slice(0, index) + americanToBritishSpelling[americanWord] + britishString.slice(index + americanWord.length);
                }
                
            })
        }

        for (let americanTitle in americanToBritishTitles) {
            const wordMatches = [...britishString.toLowerCase().matchAll(americanTitle)];
            wordMatches.forEach(match => {
                const index = match['index'];
                if (britishString[index + americanTitle.length] === " " || britishString[index + americanTitle.length] === "." || britishString[index + americanTitle.length] === "?" || britishString[index + americanTitle.length] === "!") {
                    const newTitle = americanToBritishTitles[americanTitle][0].toUpperCase() + americanToBritishTitles[americanTitle].slice(1);
                    britishString = britishString.slice(0, index) + newTitle + britishString.slice(index + americanTitle.length);
                }
            })
        }


        if (americanString === britishString) {
            britishString = "Everything looks good to me!";
        }
        return britishString;
    }

    britishToAmerican(britishString) {
        const britishTimeRegex = /[0-9][0-9]?\.[0-9][0-9]/g;
        let americanString = britishString;
        const timeMatches = [...americanString.matchAll(britishTimeRegex)]
        timeMatches.forEach(match => {
            const oldTime = match[0]
            const index = match['index'];
            let newTime;
            if (oldTime.length === 4) {
                newTime = oldTime[0] + ':' + oldTime[2] + oldTime[3];
            } else {
                newTime = oldTime[0] + oldTime[1] + ':' + oldTime[3] + oldTime[4];
            }
            americanString = americanString.slice(0, index) + newTime + americanString.slice(index + oldTime.length);
        });

        for (let britishWord in britishOnly) {
            const wordMatches = [...americanString.toLowerCase().matchAll(britishWord)];
            wordMatches.forEach(match => {
                const index = match['index'];
                if (americanString[index + britishWord.length] === " " || americanString[index + britishWord.length] === "?" || americanString[index + britishWord.length] === "." || americanString[index + britishWord.length] === "!") {
                    americanString = americanString.slice(0, index) + britishOnly[britishWord] + americanString.slice(index + britishWord.length);
                }
            })
        }

        for (let americanWord in americanToBritishSpelling) {
            const britishWord = americanToBritishSpelling[americanWord];
            const wordMatches = [...americanString.toLowerCase().matchAll(britishWord)];
            wordMatches.forEach(match => {
                const index = match['index'];
                if (americanString[index + britishWord.length] === " " || americanString[index + britishWord.length] === "?" || americanString[index + britishWord.length] === "." || americanString[index + britishWord.length] === "!") {
                    americanString = americanString.slice(0, index) + americanWord + americanString.slice(index + britishWord.length);
                }
            })
        }

        for (let americanTitle in americanToBritishTitles) {
            const britishTitle = americanToBritishTitles[americanTitle];
            const wordMatches = [...britishString.toLowerCase().matchAll(britishTitle)];
            wordMatches.forEach(match => {
                const index = match['index'];
                if (americanString[index + britishTitle.length] === " " || americanString[index + britishTitle.length] === "." || americanString[index + britishTitle.length] === "?" || americanString[index + britishTitle.length] === "!") {
                    const newTitle = americanTitle[0].toUpperCase() + americanTitle.slice(1);
                    americanString = americanString.slice(0, index) + newTitle + americanString.slice(index + britishTitle.length);
                }
            })
        }

        if (britishString === americanString) {
            americanString = "Everything looks good to me!";
        }

        return americanString;
    }

    highlightTranslation(original, translated) {
        if (translated === 'Everything looks good to me!') {
            return translated;
        }
        const originalArray = original.split(' ');
        const translatedArray = translated.split(' ');
        for (let i = 0; i < translatedArray.length; i++) {

            if (originalArray[i] !== translatedArray[i]) {
                if (translatedArray[i].slice(-1) === '.') {
                    translatedArray[i] = '<span class="highlight">' + translatedArray[i].slice(0, -1) + '</span>' + '.';
                } else if (translatedArray[i].slice(-1) === '?') {
                    translatedArray[i] = '<span class="highlight">' + translatedArray[i].slice(0, -1) + '</span>' + '?';
                } else if (translatedArray[i].slice(-1) === '!') {
                    translatedArray[i] = '<span class="highlight">' + translatedArray[i].slice(0, -1) + '</span>' + '!';
                } else {
                    translatedArray[i] = '<span class="highlight">' + translatedArray[i] + '</span>';
                }
            }
        }
        return translatedArray.join(' ');
    }

}

module.exports = Translator;