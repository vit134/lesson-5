module.exports = files => {
	let newData = [{
		name: '/',
		path: '',
		children: []
	}];


	files.map(function (item) {
		let allFolders = item.path.split('/');
		let thisFolder, thisPath, thisIndex;

		thisFolder = newData[0].children;
		thisPath = newData[0].path;

		if (allFolders.length > 1) {
			let file = allFolders.pop();

			allFolders.map(function (fol) {
				thisIndex = -1;
				thisFolder.filter(function (folder, index) {
					if (folder.name === fol) {
						thisIndex = index;
					}
				});
				if (thisIndex === -1) {
					thisIndex = thisFolder.length;
					thisFolder.push({
						name: fol,
						path: thisPath === '' ? thisPath + fol : thisPath + '/' + fol,
						type: 'directory',
						children: []
					});
				}

				thisPath = thisFolder[thisIndex].path;
				thisFolder = thisFolder[thisIndex].children;
			});

			thisFolder.push({
				name: file,
				path: thisPath + '/' + file,
				type: 'file',
				hash: item.hash
			});
		} else {
			thisFolder.push({
				name: item.name,
				path: thisPath + item.path,
				type: 'file',
				hash: item.hash
			});
		}
	});

	return newData;
};