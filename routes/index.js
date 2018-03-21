const express = require('express');

const router = express.Router();

const {spawn} = require('child_process');

const gitExec = command => (
	new Promise((resolve, reject) => {
		const thread = spawn('git', command);
		const stdOut = [];
		const stdErr = [];

		thread.stdout.on('data', (data) => {
			stdOut.push(data.toString('utf8'));
		});

		thread.stderr.on('data', (data) => {
			stdErr.push(data.toString('utf8'));
		});

		thread.on('close', () => {
			if (stdErr.length) {
				reject(stdErr.join(''));
				return;
			}
			resolve(stdOut.join());
		});
	})
);

module.exports = gitExec;


gitExec(['branch'])
	.then((branchInfo) => {
		console.log(branchInfo);
	})

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', {pageName: 'index', title: 'Express'});
});

module.exports = router;
