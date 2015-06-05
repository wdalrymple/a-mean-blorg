'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title:  {type : String, default : '', trim : true},
  content:   {type : String, default : '', trim : true},
  synopsis: {type:String, default:'',trim:true},
  user:   {type : Schema.ObjectId, ref : 'User'},
  comments: [{
    content: { type : String, default : '', trim : true },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  tags:   [{type: String, default:'', trim:true}],
  createdAt  : {type : Date, default : Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
