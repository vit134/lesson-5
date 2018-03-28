const {spawn} = require('child_process');
const config = require('config');


const gitExec = async (command) => {
	let isGit = true;

	const checkGit = new Promise((resolve, reject) => {
		const thread = spawn('git', {cwd: config.get('repoPath')});

		thread.on('error', (error => {
			reject({status: false, data: error});
		}));

		thread.on('close', () => resolve());
	});

	isGit = await checkGit
		.then(() => true, () => false);

	return new Promise((resolve, reject) => {
		if (isGit) {
			const thread = spawn('git', command, {cwd: config.get('repoPath')});
			const stdOut = [];
			const stdErr = [];

			thread.stdout.on('data', (data) => {
				stdOut.push(data.toString('utf8'));
			});

			thread.stderr.on('data', (data) => {
				stdErr.push(data.toString('utf8'));
			});

			thread.on('close', (code) => {
				resolve({status: !!stdErr.length, data: stdErr.length ? stdErr.join('') : stdOut, code: code});
			});
		} else {
			reject({status: false, message: 'no git repo'});
		}
	});
};

module.exports = gitExec;