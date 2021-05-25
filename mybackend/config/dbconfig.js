import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose'); 
 
 mongoose.Promise = global.Promise;
 
 mongoose.connect('mongodb+srv://hariskiller:y2rh9zDeCxajtVkx@cluster0.9zwax.mongodb.net/myFirstDatabase?retryWrites=true/ResBook', {
  dbName: 'ResBook',
  user: 'hariskiller',
  pass: 'y2rh9zDeCxajtVkx',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
 }, function (err) {
 
  if (err) throw err;
  
  console.log('Successfully connected');
  
  });
 //mongoose.connect('mongodb://localhost:27017/Jobweb', function (err) {
 
  //  if (err) throw err;
  
  //  console.log('Successfully connected');
  
 //});
 var db=mongoose.connection;
 export default db