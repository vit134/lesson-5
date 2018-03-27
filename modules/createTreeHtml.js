const createHtml = filesTree => {
	let glogbalUl = '<ul>';

	const createItem = (name, type, hash, empty) => {

		let ul = `<li class="files__${type}">`;

		if (hash && hash !== '') {
			ul += `<a href="/file/${hash}?name=${name}">${name}</a>`;
		} else {
			ul += name;
		}

		if (empty) {
			ul += '</li>';
		} else {
			ul += '<ul>';
		}

		return ul;
	};

	const closeItem = () => {
		return '</ul></li>';
	};

	const createTreeHtml = tree => {
		const walk = items => {
			let filesInFolder = '';

			if (items) {
				items.forEach(item => {
					if (item.type === 'directory') {
						
						if (item.children && item.children.length > 0) {
							glogbalUl += createItem(item.name, item.type, null, !item.children);
							walk(item.children);
							glogbalUl += closeItem();
						} else {
							glogbalUl += createItem(item.nameitem.type, null, true);
						}
					} else {
						filesInFolder += createItem(item.name, item.type, item.hash, true);
					}
				});
			}

			glogbalUl += filesInFolder;
		};

		walk(tree.children);
	};

	createTreeHtml(filesTree);

	return glogbalUl;

};

module.exports = createHtml;