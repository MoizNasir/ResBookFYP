{/*}
var Sentiment = require('sentiment');
const MonkeyLearn = require('monkeylearn')

var sentiment = new Sentiment();
var result = sentiment.analyze('Not That Good');

console.dir(result); */}
{/*
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
const { review } = 'Not That Good';
const lexedReview = aposToLexForm(review);
const casedReview = lexedReview.toLowerCase();
const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');

const { WordTokenizer } = natural;
const tokenizer = new WordTokenizer();
const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

tokenizedReview.forEach((word, index) => {
    tokenizedReview[index] = spellCorrector.correct(word);
})
const filteredReview = SW.removeStopwords(tokenizedReview);

const { SentimentAnalyzer, PorterStemmer } = natural;
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
const analysis = analyzer.getSentiment(filteredReview);
console.log(analysis)*/}
{/*
const ml = new MonkeyLearn('0fe03baf249a8f1c9f176ade71cb6617ba652caf')
let model_id = 'cl_pi3C7JiL'
let data = ["This is a great tool!"]
ml.classifiers.classify(model_id, data).then(res => {
    console.log(res.body)
})*/}
const db = require('./config/dbconfig.js')
 exports.db
var sentiment = require( 'wink-sentiment' );
var ObjectId = require('mongodb').ObjectID;
var reviewModel = require('./models/reviewsmodel')
sentiment( 'Excited to be part of the @imascientist team:-)!' );
console.log( sentiment( 'Not a good product :(' ) );
console.log( sentiment( 'Tasty Crust' ) );
async function gg(){
    const filter = {};
    const all = await reviewModel.find(filter)
    
        await reviewModel.findOne({"_id": ObjectId("60b3c58d281ae431b0feb666")}, async function(err, review) {
            console.log("review Found",review)
            const sen=sentiment(review.review)
            console.log(sen.score)
            
            if(sen.score>0){
                review.sentiment="Positive"
            }
            return review.save()
            
          });
}
gg()
