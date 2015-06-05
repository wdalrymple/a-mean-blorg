'use strict';

var express = require('express');
var controller = require('./blog.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

//secure authoring routes to the admin role
router.get('/', controller.index);
router.get('/summary/', controller.summary);
router.get('/summary/:year/', controller.summaryByYear);
router.get('/summary/:year/:month/', controller.summaryByYearMonth);
router.get('/countByYearMonth/',controller.aggregateByYearMonth);
router.get('/nextArticle/:date/',controller.getNextArticle);
router.get('/previousArticle/:date/',controller.getPreviousArticle);
router.get('/tag/:tag/',controller.getSummaryByTag);
router.get('/tagCloud/',controller.getTagCloud);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//secure the commenting upsert routes to authenticated users
router.post('/:id/comment', auth.isAuthenticated(), controller.addComment);
router.delete('/:id/comment/:commentId', auth.isAuthenticated() ,controller.removeComment);

module.exports = router;
