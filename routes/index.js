const express = require('express');

const router = express.Router();

const gitExec = require('../modules/GitExec');

router.get('/', (req, res) => {
	
	console.log('index.js');

	gitExec(['branch'])
		.then(result => {
			let branches = [{}];

			if (!result.status) {
				let branchesInfo = result.data[0].split('\n');

				branches = branchesInfo.map((el) => {
					return {
						name: el.trim(),
						link: el.replace('*', '').trim(),
						current: el.indexOf('*') !== -1 ? false : true
					};
				});
			}
			
			console.log(branches);

			res.render('index', {pageName: 'index', title: 'Express', branches: branches});
		},
		error => {
			// вторая функция - запустится при вызове reject
			console.log('index.js Rejected: ' + error); // error - аргумент reject
			res.render('error', {pageName: 'index', title: 'Express'});
		});
});


module.exports = router;