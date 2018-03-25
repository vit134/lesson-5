const moment = require('moment');
const config = require('config');

module.exports =  {
	commit: result => {
		let commits = [];
		result = result.data.join(' ').split(/\n\nc/);

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

		return commits;
	},

	files: result => {
		result = result.data.join(' ').split('\n');

		let files = [];

		result.forEach(item => {
			if (item) {
				item = item.split(' ')[2].split('\t');

				let pathPieces = item[1].split('/');

				let fileName = pathPieces[pathPieces.length - 1];
				let fileHash = item[0];
				let filePath = item[1];

				files.push({
					name: fileName,
					hash: fileHash,
					path: filePath
				});
			}
		});

		return files;
	}
}
