const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/patent')
  .then(()=>{console.log('Connected to Mongo')})
  .catch((e) => console.log(e));

let patentSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: String
});


let Patent = mongoose.model('Patent', patentSchema);

let save = (patent) => {
  var currPatent = new Patent({
    id: parseInt(patent.patent_id),
    title: patent.patent_title
  })
  return currPatent.save();
}

let getSaved = () => {
  return Patent.find()
}

module.exports = {
  save,
  getSaved
}
// module.exports.save = save;