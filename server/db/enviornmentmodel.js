var mongoose = require('mongoose');

var environmentSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  affects: Schema.Types.Mixed
});

var Environment = mongoose.model('Environment', environmentSchema);

module.export = Environment;
