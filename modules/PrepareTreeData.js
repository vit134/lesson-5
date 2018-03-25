module.exports = files => {
	//console.log('!prepare tree data!');
		
	//console.log('files',files);


	//console.log(files);
	/*let prepareTree = files => {
		let papki = {
			folders: {},
			files: []
		};


		for (var i = 0, item; item = files[i++];) {
			let all = item.path.split('/');
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

		return papki;
	};*/
	
	//console.log(prepareTree(files));




	return files;
};