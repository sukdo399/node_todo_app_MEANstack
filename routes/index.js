var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Todo = mongoose.model('Todo', {
	text: String,
	done: Boolean
});

// 할일 리스트
router.get('/todos', function(req, res, next) {
	Todo.find(function(err, todos) {
		if(err) res.send(err);
		else res.json(todos);
	});
});

// 할일 저장
router.post('/todos', function(req, res, next) {
	var data = {text:req.body.text, done:false};
	Todo.create(data, function(err, todo) {
		if(err) res.send(err);
		else {
			Todo.find(function(err, todos) {
				res.json(todos);
			});
		}
	});
});

// 할일 삭제
router.delete('/todos/:id', function(req, res, next) {
	var data = {_id:req.params.id};
	Todo.remove(data, function(err, todo) {
		if(err) res.send(err);
		else {
			Todo.find(function(err, todos) {
				res.json(todos);
			});
		}
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
