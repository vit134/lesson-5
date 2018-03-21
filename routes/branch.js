const express = require('express');

const router = express.Router();

const gitExec = require('../modules/GitExec');

router.get('/:branch', (req, res) => {

	gitExec(['checkout', 'local-git'])
		.then((branchInfo) => {
			console.log(branchInfo);
			res.render('branch', {});
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
