const express = require('express');

const router = express.Router();

const gitExec = require('../modules/GitExec');
const getFiles = require('../modules/getFiles');

router.get('/:branch', (req, res) => {
	gitExec(['checkout', req.params.branch])
		.then(() => {
			gitExec(['log'])
				.then(result => {
					let commits = [];

					result = result.data.join(' ').split(/\n \nc/);
					
					console.log(result);

					result.forEach(function(mit){
						mit = /^c/.test(mit) ? mit : 'c' + mit;

						let commit = mit.match(/[\da-f]{40}/),
							author = mit.match(/Author:\s([^<]+)?/),
							d = mit.match(/Date:\s*(.+)/),
							comment = mit.match(/\n\n\s*(.+)/);

						commits.push({
							commit: commit[0],
							author: author[1],
							date: new Date(d[1]),
							comment: comment[1]
						});

					});

					res.render('branch', {pageName: 'branch',branchName: req.params.branch, commits: commits, files: getFiles()});
				});
		});
});

router.get('/:branch/:commit', (req, res) => {
	gitExec(['checkout', req.params.commit])
		.then(() => {
			res.render('commit', {pageName: 'commit' ,branchName: req.params.branch, commitName: req.params.commit, files: getFiles()});
		});


});

module.exports = router;
