module.exports = (str) => {
	
	let encode = () => {
		let VRegExp = new RegExp(/\//g);

		return str.replace(VRegExp, '%%');
	};

	let decode = () => {
		let VRegExp = new RegExp(/%%/g);

		return str.replace(VRegExp, '/');
	};

	return {
		encode: encode,
		decode: decode
	};
};