/**
 * Created by Tyler on 3/30/2016.
 */
var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: Date, default: Date.now()},
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    extension: String
});

mongoose.model('Image', ImageSchema);