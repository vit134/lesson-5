const express = require('express');
const router = express.Router();

const encDec = require('../modules/EncodeDecodeStr');

var fs = require('fs');

router.get('/', (req, res) => {
	//console.log();
	fs.readFile(encDec(req.query.path).decode(), 'utf8',
		function(error,data){
			if(!error) {
				res.render('file', {pageName: 'index', nav: false, data: JSON.stringify(data)});
			} else {
				res.render('error', {message: 'I am sorry', error: error});
				//throw error;
			}


		});

});


module.exports = router;