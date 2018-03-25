const express = require('express');
const router = express.Router();

const gitExec = require('../modules/GitExec');


router.get('/:name', (req, res) => {
	let getFileContent = gitExec(['show', req.params.name]);

	getFileContent
		.then(result => {
			res.render('file', {pageName: 'index', nav: false, fileName: req.query.name, data: result.data});
		});
});


module.exports = router;