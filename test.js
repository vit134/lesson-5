var assert = require('chai').assert;

const parseGit = require('./modules/ParseGitString');
const prepareTreeData = require('./modules/PrepareTreeData');

/*
		Проверка свойств объекта
		map (Array) - массив соответствия
		obj	- (Obkect) - проверяемый объект
	*/
let checkObjProp = (map, obj) => {
	let result = 0;

	map.forEach(el => {
		//el[0] - название поля
		if (el[0] in obj) {
			result++;
		}
	});

	return result === map.length;
};

/*
	Проверка тива свойства объекта
	map (Array) - массив соответствия
	obj	- (Obkect) - проверяемый объект
*/
let chechTypeOfProp = (map, obj) => {
	let result = 0;

	map.forEach(el => {
		//el[0] - название пооля
		//el[1] - тип

		if (typeof obj[el[0]] === el[1]) {
			result++;
		}
	});

	return result === map.length;
};

describe('ParseGitString', function () {
	describe('ParseGitString.Commit', function () {
		//на вход передаю строку с коммитом
		const commit = {
			data: ['\ncommit daaaf6d2fa30365f8598763e28425b2987c75974\nAuthor: vit134 <vit134@mail.ru>\nDate:   Sun Mar 25 20:10:08 2018 +0300\n\n    remove env port\n']
		};

		//функция возвращает массив объектов, берем первый элемент
		const obj = parseGit.commit(commit)[0];

		// массив соответствия элементов и типов данных
		const map = [['author', 'string'], ['commit', 'string'], ['date', 'string'], ['comment', 'string']];

		describe('Проверяем количество элементов', function () {
			it('Должен получиться объект из 4 элементов', function () {

				//считаем размер объекта
				let size = Object.keys(obj).length;

				assert.equal(size, 4);
			});
		});

		describe('Проверяем какие элементы вернулись', function () {
			it('Должны вернуться элементы commit, author, date, comment', function () {
				assert.isTrue(checkObjProp(map, obj));
			});
		});

		describe('Проверяем тип данных элементов', function () {
			it('Должны вернуться string, string, string, string', function () {
				assert.isTrue(chechTypeOfProp(map, obj));
			});
		});
	});

	describe('ParseGitString.files', function () {
		//на вход передеаем строку
		let file = {data: ['100644 blob 93f13619916123cf5434dab2ffcc8263c7420af1\t.dockerignore\n100644 blob 62a8320b47a58eed738d5569d12841ef0d55ddb5\t.eslintignore\n']};

		//функция возвращает массив объектов, берем первый элемент
		let obj = parseGit.files(file)[0];

		// массив соответствия элементов и типов данных
		let map = [['name', 'string'], ['hash', 'string'], ['path', 'string']];

		describe('Проверяем количество элементов', function () {
			it('должен получиться объект из 3 элементов', function () {
				let size = Object.keys(obj).length;
				assert.equal(size, 3);
			});
		});

		describe('Проверяем какие элементы вернулись', function () {
			it('Должны вернуться элементы name, hash, path', function () {
				assert.isTrue(checkObjProp(map, obj));
			});
		});

		describe('Проверяем тип данных элементов', function () {
			it('Должны вернуться string, string, string', function () {
				assert.isTrue(chechTypeOfProp(map, obj));
			});
		});

	});
});

describe('PrepareTreeData', function () {
	let files = [
		{
			name: 'main.less',
			hash: 'c79c1fa0f20d1dc9515fca44cd909e431869ead5',
			path: 'client/blocks/Breadcrumbs/main.less'
		},
		{
			name: 'main.less',
			hash: '03ebc94bce511d7594f97d2231a43b172bbd527d',
			path: 'client/blocks/Commits/main.less'
		},
		{
			name: 'main.less',
			hash: '683d3dd1dd191e384943a78fb5e4f9cd05d7339d',
			path: 'client/blocks/Error/main.less'
		},
		{
			name: 'bla.less',
			hash: '683d3dd1dd191e384943a78fb5e4f9cd05d7339d',
			path: 'bla.less'
		}
	];

	let map = [['name', 'string'], ['path', 'string'], ['type', 'string'], ['children', 'object']];

	let resultArr = prepareTreeData(files);

	describe('Проверяем количество элементов', function () {
		it('должен получиться объект из 4 элементов', function () {
			let size = Object.keys(resultArr[0].children[0]).length;
			assert.equal(size, 4);
		});
	});

	describe('Проверяем какие элементы вернулись', function () {
		it('Должны вернуться элементы name, path, type, children', function () {
			assert.isTrue(checkObjProp(map, resultArr[0].children[0]));
		});
	});

	describe('Проверяем тип данных элементов', function () {
		it('Должны вернуться string, string, string, Object', function () {

			assert.isTrue(chechTypeOfProp(map, resultArr[0].children[0]));

		});
	});

	describe('Проверяем значение поля type', function () {
		it('Должнен вернуться file или directory', function () {

			assert.equal(resultArr[0].children[1].type, 'file');
			assert.equal(resultArr[0].children[0].type, 'directory');
		});
	});
});