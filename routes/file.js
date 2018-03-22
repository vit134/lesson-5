const express = require('express');
const router = express.Router();

var fs = require('fs');

router.get('/:file', (req, res) => {
	fs.readFile("local-repo/new-branch-commit-1/1.js", "utf8",
		function(error,data){
			if(error) throw error; // если возникла ошибка

			res.render('file', {pageName: 'index', title: 'Express', data: JSON.stringify(data)});
		});

});


module.exports = router;