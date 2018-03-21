const express = require('express');

const router = express.Router();

const gitExec = require('../modules/GitExec');

gitExec(['branch'])
	.then((branchInfo) => {
		let branchesInfo = branchInfo[0].split('\n');
		
		let branches = branchesInfo.map((el) => {

			return {
				name: el.trim(),
				link: el.replace('*', '').trim(),
				current: el.indexOf('*') !== -1 ? false : true
			}
		})

		router.get('/', (req, res) => {
			res.render('index', {pageName: 'index', title: 'Express', branches: branches});
		});
	});


module.exports = router;



