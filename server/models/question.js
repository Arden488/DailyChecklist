const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  repeat: String,
  type: String,
  value: String,
  options: {
    range: String,
    reverse: Boolean,
    badStartsOn: String,
    normalStartsOn: String,
    values: [{
      label: String,
      value: String
    }]
  }
});

const ModelClass = mongoose.model('question', questionSchema);

module.exports = ModelClass;
