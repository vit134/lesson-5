const encodeDecode = require('./EncodeDecodeStr');

const createHtml = filesTree => {
	let glogbalUl = '<ul>';

	const createItem = (name, type, link, empty) => {

		let ul = `<li class="${type}">`;

		if (link && link !== '') {
			ul += `<a href="/file/${name}?path=${link}">${name}</a>`;
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
						filesInFolder += createItem(item.name, item.type, encodeDecode(item.path).encode(), true);
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