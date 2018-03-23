const fs = require('fs');
const config = require('config');
const Tree = require('directory-tree');

const getFiles = () => {
	const dir = config.get('repoPath');
	let glogbalUl = '<ul>';
	let filesTree;

	let getFilesArr = new Promise((resolve, reject) => {
		resolve(Tree(dir, {exclude: new RegExp('.git')}));
	});

	const createFolder = (folderName, empty) => {
		let ul = `<li>${folderName}`;

		if (empty) {
			ul += '</li>';
		} else {
			ul += '<ul>';
		}

		return ul;
	};

	const closeFolder = () => {
		return '</ul></li>';
	};

	const createTreeHtml = tree => {

		const walk = items => {
			let filesInFolder = '';

			if (items) {
				items.forEach(item => {
					if (item.type === 'directory') {

						if (item.children && item.children.length > 0) {
							glogbalUl += createFolder(item.name, !item.children);
							walk(item.children);
							glogbalUl += closeFolder();
						} else {
							glogbalUl += createFolder(item.name, true);
						}
					} else {
						filesInFolder += createFolder(item.name, true);
					}
				});
			}

			glogbalUl += filesInFolder;
		};

		walk(tree.children);
	};

	getFilesArr.then(result => {
		fs.writeFile(dir + '/tree.json', JSON.stringify(result), function(error){
			if(error) throw error;
		});

		createTreeHtml(result);

		let aa = glogbalUl + '</ul>';

		fs.writeFile(dir + '/tree.html', aa, function(error){
			if(error) throw error;
		});

	},error => {
		throw error;
	});

};

module.exports = getFiles;