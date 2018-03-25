module.exports = (() => {
	let dir = document.querySelectorAll('.directory');

	dir.forEach(function (d) {
		d.addEventListener('click', (e) => {
			e.stopPropagation();
			e.target.classList.toggle('visible');
		});
	}.bind(this));
})();