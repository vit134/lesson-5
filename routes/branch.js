const express = require('express');

const router = express.Router();

const gitExec = require('../modules/GitExec');

router.get('/:branch', (req, res) => {

	gitExec(['checkout', req.params.branch])
		.then(() => {
			gitExec(['log'])
				.then(result => {
					console.log(result.data);
					var commits = [];

					result = result.data.join(' ').split(/\n\nc/);

					result.forEach(function(mit){
						mit = /^c/.test(mit) ? mit : 'c' + mit;

						var commit = mit.match(/[\da-f]{40}/),
							author = mit.match(/Author:\s([^<]+)?/),
							d = mit.match(/Date:\s*(.+)/),
							comment = mit.match(/\n\n\s*(.+)/);

						commits.push({
							commit: commit[0],
							author: author[1],
							date: new Date(d[1]),
							comment: comment[1]
						});

						/*console.log('commit: ', commit[0]);
						console.log('author: ', author[1]);
						console.log('date: ', new Date(d[1]));
						console.log('comment: ', comment[1]);

						console.log('\n\n');*/

					});
					
					console.log(commits);

					res.render('branch', {pageName: 'branch',branchName: req.params.branch, data: commits});


				});
			//}


		});


});


module.exports = router;


/*
const express = require('express');

const router = express.Router();

/!* GET users listing. *!/
router.get('/:branch', (req, res) => {
	res.render('branch', {pageName: 'branch', title: 'Express', branchName: req.params.branch});
});

module.exports = router;
*/
