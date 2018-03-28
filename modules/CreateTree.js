module.exports = (filesPath) => {
	let treeData = require('./PrepareTreeData')(filesPath);
	let html = require('./createTreeHtml');

	return html(treeData[0]);
};