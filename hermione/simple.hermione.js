var assert = require('chai').assert;

describe('Проверяем количество элементов', function() {
	it('Должен получиться объект из 4 элементов', function () {

		return this.browser
			.url('/')
			.isExisting('.branches__link.current')
			.then((exists) => {
				assert.ok(exists, 'появился');
			});
	});
});