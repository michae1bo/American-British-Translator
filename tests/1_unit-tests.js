const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    const translator = new Translator();

    test('Translate "Mangoes are my favorite fruit." to British English', function () {
        const text = 'Mangoes are my favorite fruit.';
        const translatedText = 'Mangoes are my favourite fruit.';
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test('Translate "I ate yogurt for breakfast." to British English', function() {
        const text = "I ate yogurt for breakfast.";
        const translatedText = "I ate yoghurt for breakfast.";
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test(`Translate "We had a party at my friend's condo." to British English`, function() {
        const text = "We had a party at my friend's condo.";
        const translatedText = "We had a party at my friend's flat.";
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test('Translate "Can you toss this in the trashcan for me?" to British English', function() {
        const text = "Can you toss this in the trashcan for me?";
        const translatedText = "Can you toss this in the bin for me?";
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test('Translate "The parking lot was full." to British English', function() {
        const text = "The parking lot was full.";
        const translatedText = "The car park was full.";
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test('Translate "Like a high tech Rube Goldberg machine." to British English', function() {
        const text = "Like a high tech Rube Goldberg machine.";
        const translatedText = "Like a high tech Heath Robinson device.";
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test('Translate "To play hooky means to skip class or work." to British English', function() {
        const text = "To play hooky means to skip class or work.";
        const translatedText = "To bunk off means to skip class or work.";
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test('Translate "No Mr. Bond, I expect you to die." to British English', function() {
        const text = "No Mr. Bond, I expect you to die.";
        const translatedText = "No Mr Bond, I expect you to die.";
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test('Translate "Dr. Grosh will see you now." to British English', function() {
        const text = "Dr. Grosh will see you now.";
        const translatedText = "Dr Grosh will see you now.";
        assert.equal(translator.americanToBritish(text), translatedText);
    })
    test('Translate "Lunch is at 12:15 today." to British English', function() {
        const text = "Lunch is at 12:15 today.";
        const translatedText = "Lunch is at 12.15 today.";
        assert.equal(translator.americanToBritish(text), translatedText);
    })


    test('Translate "We watched the footie match for a while." to American English', function() {
        const text = "We watched the footie match for a while.";
        const translatedText = "We watched the soccer match for a while."
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test('Translate "Paracetamol takes up to an hour to work." to American English', function() {
        const text = "Paracetamol takes up to an hour to work.";
        const translatedText = "Tylenol takes up to an hour to work.";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test('Translate "First, caramelise the onions." to American English', function() {
        const text = "First, caramelise the onions.";
        const translatedText = "First, caramelize the onions";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test('Translate "I spent the bank holiday at the funfair." to American English', function() {
        const text = "I spent the bank holiday at the funfair.";
        const translatedText = "I spent the public holiday at the carnival.";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test('Translate "I had a bicky then went to the chippy." to American English', function() {
        const text = "I had a bicky then went to the chippy.";
        const translatedText = "I had a cookie then went to the fish-and-chip shop.";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test(`Translate "I've just got bits and bobs in my bum bag." to American English`, function() {
        const text = "I've just got bits and bobs in my bum bag.";
        const translatedText = "I've just got odds and ends in my fanny pack.";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test('Translate "The car boot sale at Boxted Airfield was called off." to American English', function() {
        const text = "The car boot sale at Boxted Airfield was called off.";
        const translatedText = "The swap meet at Boxted Airfield was called off.";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test('Translate "Have you met Mrs Kalyani?" to American English', function() {
        const text = "Have you met Mrs Kalyani?";
        const translatedText = "Have you met Mrs. Kalyani?";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test(`Translate "Prof Joyner of King's College, London." to American English`, function() {
        const text = "Prof Joyner of King's College, London.";
        const translatedText = "Prof. Joyner of King's College, London.";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })
    test('Translate "Tea time is usually around 4 or 4.30." to American English', function() {
        const text = "Tea time is usually around 4 or 4.30.";
        const translatedText = "Tea time is usually around 4 or 4:30.";
        assert.equal(translator.britishToAmerican(text), translatedText);
    })

    test('Highlight translation in "Mangoes are my favorite fruit."', function () {
        const text = 'Mangoes are my favorite fruit.';
        const translatedText = 'Mangoes are my favourite fruit.';
        const highlightedText = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
        assert.equal(translator.highlightTranslation(text, translatedText), highlightedText);
    })
    test('Highlight translation in "I ate yogurt for breakfast."', function () {
        const text = 'I ate yogurt for breakfast.';
        const translatedText = 'I ate yoghurt for breakfast.';
        const highlightedText = 'I ate <span class="highlight">yoghurt</span> for breakfast.'
        assert.equal(translator.highlightTranslation(text, translatedText), highlightedText);
    })
    test('Highlight translation in "We watched the footie match for a while."', function () {
        const text = 'We watched the footie match for a while.';
        const translatedText = 'We watched the soccer match for a while.';
        const highlightedText = 'We watched the <span class="highlight">soccer</span> match for a while.'
        assert.equal(translator.highlightTranslation(text, translatedText), highlightedText);
    })
    test('Highlight translation in "Paracetamol takes up to an hour to work."', function () {
        const text = 'Paracetamol takes up to an hour to work.';
        const translatedText = 'Tylenol takes up to an hour to work.';
        const highlightedText = '<span class="highlight">Tylenol</span> takes up to an hour to work.'
        assert.equal(translator.highlightTranslation(text, translatedText), highlightedText);
    })
});
