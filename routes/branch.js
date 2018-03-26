const express = require('express');
const router = express.Router();

const gitExec = require('../modules/GitExec');
const parseGit = require('../modules/ParseGitString');
const getTree = require('../modules/CreateTree');
//const getFiles = require('../modules/getFiles');

router.get('/:branch', (req, res) => {
	let getCommits = gitExec(['log', req.params.branch]);
	let getFiles = gitExec(['ls-tree','-r', req.params.branch]);

	Promise.all([getCommits, getFiles]).then(result => {
		let commitResult = result[0];
		let filesResult = result[1];

		let commits = parseGit.commit(commitResult);
		let files = parseGit.files(filesResult);
		

		getTree(files);

		res.render('branch', {pageName: 'branch', branchName: req.params.branch, commits: commits, files: files});
	});
});

router.get('/:branch/:commit', (req, res) => {
	let getFiles = gitExec(['ls-tree','-r', req.params.commit]);

	getFiles
		.then((result) => {
			let files = parseGit.files(result);

			res.render('commit', {pageName: 'commit', nav: true, branchName: req.params.branch, commitName: req.params.commit, files: files});
		}, error => {
			//console.log(error);
			throw new Error(error);
		});
});


module.exports = router;
