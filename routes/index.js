const express = require('express');

const router = express.Router();

const gitExec = require('../modules/GitExec');

router.get('/', (req, res) => {

	gitExec(['branch'])
		.then((result) => {
			let branches;

			if (!result.status) {
				let branchesInfo = result.data[0].split('\n');

				branches = branchesInfo.map((el) => {
					return {
						name: el.trim(),
						link: el.replace('*', '').trim(),
						current: el.indexOf('*') !== -1 ? false : true
					}
				})
			}


			res.render('index', {pageName: 'index', title: 'Express', branches: branches});
		});
});


module.exports = router;