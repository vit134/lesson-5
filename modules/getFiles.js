const fs = require('fs');
const config = require('config');
const encDec = require('./EncodeDecodeStr');

const getFiles = () => {
	let dir = config.get('repoPath');

	let walk = function (dir) {
		let results = [];
		let list = fs.readdirSync(dir);

		list.forEach(file => {
			if (file !== '.git') {
				file = dir + '/' + file;
				file = file.replace('./', '');


				let link = encDec(file).encode();

				let stat = fs.statSync(file);
				if (stat && stat.isDirectory()) {
					results = results.concat(walk(file));
				} else {
					results.push({name:file, link: link});
				}
			}
		});
		
		console.log(results);
		return results;
	};

	let createFolder = (folderName, items) => {
		return (`
			<ul>
				${folderName}
				${items.map(item => item)}
			</ul>
		`);
	};

	let createFile = fileName => {
		return `<li>${fileName}</li>`;
	};

	console.log(createFolder('blabla', [createFile('huipizda'), '<li>asdasd</li>']));

	let prepareTree = files => {
		let papki = {
			folders: {},
			files: []
		};


		files.forEach(f => {
			let all = f.name.split('/');
			let file = all.pop();
			let parent = papki;

			all.forEach(ff => {
				if (ff in parent.folders) {
					parent = parent.folders[ff];
				} else {
					parent.folders[ff] = {
						folders: {},
						files: []
					};

					parent = parent.folders[ff];
				}
			});
			parent.files.push(file);
		});

		return papki;

		/*for (var i = 0, item; item = files[i++];) {
			let all = item.name.split('/');
			let file = all.pop();
			let parent = papki;

			for (var j = 1, jitem; jitem = all[j++];) {
				if (jitem in parent.folders) {
					parent = parent.folders[jitem];
				} else {
					parent.folders[jitem] = {
						folders: {},
						files: []
					};

					parent = parent.folders[jitem];
				}
			}
			parent.files.push(file);
		}

		return papki;*/
	};


	console.dir(prepareTree(walk(dir)));

	return walk(dir);
};

module.exports = getFiles;