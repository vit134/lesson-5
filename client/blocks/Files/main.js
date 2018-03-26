module.exports = (function () {
	var dir = document.querySelectorAll('.directory');

	dir.forEach(function (d) {
		d.addEventListener('click', function(e) {
			e.stopPropagation();
			e.target.classList.toggle('visible');
		});
	}.bind(this));
})();