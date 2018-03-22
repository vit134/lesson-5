const express = require('express');
const router = express.Router();
const moment = require('moment');
const config = require('config');

const gitExec = require('../modules/GitExec');
const getFiles = require('../modules/getFiles');

router.get('/:branch', (req, res) => {
	gitExec(['checkout', req.params.branch])
		.then(() => {
			gitExec(['log'])
				.then(result => {
					let commits = [];

					result = result.data.join(' ').split(/\n \nc/);

					result.forEach(function(mit){
						mit = /^c/.test(mit) ? mit : 'c' + mit;

						let commit = mit.match(/[\da-f]{40}/),
							author = mit.match(/Author:\s([^<]+)?/),
							d = mit.match(/Date:\s*(.+)/),
							comment = mit.match(/\n\n\s*(.+)/);

						commits.push({
							commit: commit[0],
							author: author[1],
							date: moment(new Date(d[1])).format(config.get('timeFormat')),
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
			res.render('commit', {pageName: 'commit', nav: true, branchName: req.params.branch, commitName: req.params.commit, files: getFiles()});
		});


});

module.exports = router;
