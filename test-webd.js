const assert = require('chai').assert;
const url = 'http://localhost:3000';

/*describe('Главная страница', () => {
	describe('Главная страница', () => {
		it('Должен быть title === Express', () => {
			browser.url(url);
			assert(browser.getTitle() === 'Express');
		});
	});

	describe('Главная страница', () => {
		it('Количество веток больше 0', () => {
			browser.url(url);

			let branchCount = browser.selectorExecute('.branches__link', function(link) {
				return link.length;
			});

			assert(branchCount > 0);
		});
	});

	describe('Главная страница', () => {
		it('Отображается ветка по умолчанию', () => {
			browser.url(url);

			let branchCurrent = browser.selectorExecute('.branches__link.current', function(link) {
				return link.length;
			});

			assert(branchCurrent > 0);
		});
	});
});*/

describe('Просмотр ветки', () => {
	describe('Кликнуть на название ветки', () => {
		it('По клику на название ветки должен перейти на страницу соответствующей ветки и сравнить заголовки', () => {
			browser.url(url);

			let currentBranch = $('.branches__link.current');
			let branchName = currentBranch.getAttribute('href').split(url + '/branch/')[1].replace('/','');

			currentBranch.click();

			//browser.close();

			assert(browser.getTitle() === 'Express-branch-' + branchName);
		});
	});

	describe('Просмотр страницы ветки', () => {
		it('По клику на ветку должен перейти на страницу соответствующей ветки и найти там коммиты и дерево файлов', () => {
			browser.url(url);

			let commits = false;
			let files = false;

			let currentBranch = $('.branches__link.current');

			currentBranch.click();

			let commitTable = $('.commits__table');

			let commitCount = commitTable.selectorExecute('tr', function(commit) {
				return commit.length;
			});

			if (commitCount > 0) {
				commits = true;
			}

			let filesBlock = $('.files > ul');

			let filesCount = filesBlock.selectorExecute('li', function(file) {
				return file.length;
			});

			if (filesCount > 0) {
				files = true;
			}
			
			assert(commits && files);

		});
	});

	describe('Работа с деревом файлов', () => {
		it('должен открыть каталог найти там первый файл, перейти на страницу этого файла и проверить есть открылось ли его содержимое', () => {
			browser.url(url);

			let file = false;

			let currentBranch = $('.branches__link.current');

			currentBranch.click();

			let firstFolder = $$('li.files__directory')[0];

			firstFolder.click();

			let firstFile = $$('.files__file')[0];

			let firstFileLink;

			if (firstFile.isVisible()) {
				firstFileLink = $$('.files__file > a')[0];

				firstFileLink.click();

				let isEx = $('#file_pre').isExisting();
				


				if (isEx) {
					file = true;
				}
			}
			
			assert(file);

		});
	});
});