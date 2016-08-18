// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var pollSchema = new Schema({
  name: String,
  creatorId: String,
  options: Array,
  dateAdded: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Poll', pollSchema);
