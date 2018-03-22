const {spawn} = require('child_process');
const config = require('config');

const gitExec = command => (
	new Promise((resolve, reject) => {
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
			resolve({status: !!stdErr.length , data: stdErr.length ? stdErr.join('') : stdOut, code: code});
		});
	})
);

module.exports = gitExec;