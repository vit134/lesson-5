const express = require('express');
const router = express.Router();

const gitExec = require('../modules/GitExec');


router.get('/:hash', (req, res) => {
	let getFileContent = gitExec(['show', req.params.hash]);

	getFileContent
		.then(result => {
			res.render('file', {pageName: 'file', nav: false, fileName: req.query.name, data: result.data});
		});
});


module.exports = router;