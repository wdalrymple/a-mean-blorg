'use strict';

var _ = require('lodash');
var Blog = require('./blog.model');

// Get list of blogs
exports.index = function(req, res) {
  Blog.find(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, blogs);
  });
};

// get next article in chronological order of createdAt date
exports.getNextArticle = function(req,res){
  var query = Blog.find(
    { createdAt :{
      $gt: new Date(req.params.date)
    }});
  query.sort('createdAt');
  query.limit(1);
  query.select('title author createdAt synopsis tags');
  query.exec(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, blogs);
  });

};

//get previous article in chronological order of createdAt date
exports.getPreviousArticle = function(req,res){
  var query = Blog.find(
    { createdAt :{
      $lt: new Date(req.params.date)
    }});
  query.sort('-createdAt');
  query.select('title author createdAt synopsis tags');
  query.limit(1);
  query.exec(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, blogs);
  });
};

// Get list of blogs
exports.summary = function(req, res) {
  var query = Blog.find();
  query.sort('-createdAt');
  query.select('title author createdAt synopsis tags');

  query.exec(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, blogs);
  });
};

// Get list of blogs
exports.summaryByYear = function(req, res) {

  var query = Blog.find(
    { createdAt :{
      $gte: new Date(req.params.year,0,1),
      $lt: new Date(Number(req.params.year)+1,0,1)
    }});
  query.sort('-createdAt');
  query.select('title author createdAt synopsis tags');
  query.exec(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, blogs);
  });
};

// Get list of blogs
exports.summaryByYearMonth = function(req, res) {

  var month = Number(req.params.month)-1;
  var year = Number(req.params.year);
  var nextYear = Number(req.params.month)===12?Number(req.params.year)+1:Number(req.params.year);
  var nextMonth = (Number(req.params.month)===12?1:Number(req.params.month)+1)-1;

  var query = Blog.find(
    { createdAt :{
      $gte: new Date(year,month,1),
      $lt: new Date(nextYear,nextMonth,1)
    }});
  query.sort('-createdAt');
  query.select('title author createdAt synopsis tags');
  query.exec(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, blogs);
  });
};

//get blog summary list by tag
exports.getSummaryByTag = function(req,res){
  var query = Blog.find({ tags : req.params.tag });
  query.sort('-createdAt');
  query.select('title author createdAt synopsis tags');
  query.exec(function (err, blogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, blogs);
  });

};

//get the aggregate count for blog entires by year/month
exports.aggregateByYearMonth = function(req,res){
  Blog.aggregate(
    {
      $project: {
          _id :1,
          year: { $year: "$createdAt" },
          month:{ $month : "$createdAt" },
          articleCount:1
        }
    },
    { $group : {
      _id : { year: "$year", month: "$month" },
      articleCount : { $sum : 1 }
    }},
    { $group : {
       _id : { year: "$_id.year" },
       articleCount : { $sum : "$articleCount" },
       months: { $push: { month: "$_id.month", articleCount: "$articleCount" }}
    }},
    function (err, result) {
      if(err) { return handleError(res, err); }
      //transform result to get rid of _id and replace with year
      var response={years:[]};
      for(var i=0;i<result.length;i++){
        response.years.push({
            year:result[i]._id.year,
            articleCount:result[i].articleCount,
            months:result[i].months
        });
      }
      return res.json(200, response);
    });
};

//get the aggregate count for blog entires by year/month
exports.getTagCloud = function(req,res){
  Blog.aggregate(
    {
      $project: {
          _id: 1,
          tag: "$tags"
        }
    },
    { $unwind: "$tag" },
    {
      $project: {
          _id: 1,
          tag: "$tag"
        }
    },
    { $group : {
      _id: { tag: "$tag" },
      tagCount: { $sum : 1 }
    }},
    { $sort: {
      "_id.tag": 1
    }},
    { $group : {
       _id: 1,
       totalTagCount: { $sum: "$tagCount" },
       tags:{ $push: { tag: "$_id.tag", tagCount: "$tagCount" }}
    }},
    function (err, result) {
      if(err) { return handleError(res, err); }
      //transform result to get rid of _id and replace with year
      var response={tags:[]};
      //return empty case if there is nothing to report
      if(result.lenght===0){return res.json(200, response);}
      for(var i=0;i<result[0].tags.length;i++){
        response.tags.push({
            text:result[0].tags[i].tag,
            tagCount:result[0].tags[i].tagCount,
            weight:Number((result[0].tags[i].tagCount/result[0].totalTagCount*100).toFixed(1))
        });
      }
      return res.json(200, response);
    });
};


// Get a single blog
exports.show = function(req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if(err) { return handleError(res, err); }
    if(!blog) { return res.send(404); }
    return res.json(blog);
  });
};

// Creates a new blog in the DB.
exports.create = function(req, res) {
  Blog.create(req.body, function(err, blog) {
    if(err) { return handleError(res, err); }
    return res.json(201, blog);
  });
};

// Updates an existing blog in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Blog.findById(req.params.id, function (err, blog) {
    if (err) { return handleError(res, err); }
    if(!blog) { return res.send(404); }

    var updated = _.merge(blog, req.body);
    updated.markModified('tags');
    updated.markModified('comments');
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, blog);
    });
  });
};

// Deletes a blog from the DB.
exports.destroy = function(req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if(err) { return handleError(res, err); }
    if(!blog) { return res.send(404); }
    blog.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
* Add comment
* @param {id} id of comment
* @param {User} user id
* @param {comment} comment text
*/
exports.addComment = function (req,res) {

  Blog.findById(req.params.id, function (err, blog) {
    if (err) { return handleError(res, err); }
    if(!blog) { return res.send(404); }
    var updated = _.merge(blog, req.body);

    updated.comments.push({
      content: req.body.comment,
      user: req.body.userId
    });

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, blog);
    });
  });

};

/**
* Remove comment
*
* @param {commentId} String
* @param {id} String -- blog id
*/
exports.removeComment = function(req, res) {

  Blog.findById(req.params.id, function (err, blog) {
    if (err) { return handleError(res, err); }
    if(!blog) { return res.send(404); }
    var updated = _.merge(blog, req.body);

    var index = -1;
    for(var i=0;i<updated.comments.length;i++){
      if(updated.comments[i]._id === req.params.commentId){
        index=i;
      }
    }

    if (index!==-1) updated.comments.splice(index, 1);
    else return res.send(404);

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, blog);
    });
  });

};


function handleError(res, err) {
  return res.send(500, err);
}
