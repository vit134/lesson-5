const express = require('express');
const router = express.Router();

const encDec = require('../modules/EncodeDecodeStr');

const gitExec = require('../modules/GitExec');


router.get('/:name', (req, res) => {
	let getFileContent = gitExec(['show', req.params.name]);

	getFileContent
		.then(result => {
			console.log(result);
			res.render('file', {pageName: 'index', nav: false, fileName: req.query.name, data: result.data});
		})

	/*fs.readFile(encDec(req.query.path).decode(), 'utf8',
		function(error,data){
			if(!error) {
				res.render('file', {pageName: 'index', nav: false, fileName: req.params.name, data: JSON.stringify(data)});
			} else {
				res.render('error', {message: 'I am sorry', error: error});
			}


		});*/

});


module.exports = router;