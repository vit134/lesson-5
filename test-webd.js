const assert = require('chai').assert;
const url = 'http://localhost:3000';

const defaultTitle = 'Express';

const branchesLinkSelector = '.branches__link';
const currentBranchSelector = branchesLinkSelector + '.current';

const goToBranch = (selectorOfBranch) => {
	let currentBranch = $(selectorOfBranch);
	let branchName = currentBranch.getAttribute('href').split(url + '/branch/')[1].replace('/','');

	currentBranch.click();

	return branchName;
};

const goToFirstCommit = () => {
	let firstCommit = $$('.commits__table__hash > a')[0];
	let commitHash = firstCommit.getText();

	firstCommit.click();

	return commitHash;
};

const findFilesBlock = () => {
	let files = false;

	let filesBlock = $('.files > ul');

	filesBlock.scroll();

	let filesCount = filesBlock.selectorExecute('li', function(file) {
		return file.length;
	});

	if (filesCount > 0) {
		files = true;
	}

	return files;
};

describe('Главная страница', () => {
	describe('Главная страница. Test#1', () => {
		it('Должен быть title === Express', () => {
			browser.url(url);

			browser.saveScreenshot('./screens/test1.png');

			assert(browser.getTitle() === defaultTitle);
		});
	});

	describe('Главная страница. Test#2', () => {
		it('Количество веток больше 0', () => {
			browser.url(url);

			let branchCount = browser.selectorExecute(branchesLinkSelector, function(link) {
				return link.length;
			});

			browser.saveScreenshot('./screens/test2.png');

			assert(branchCount > 0);
		});
	});

	describe('Главная страница. Test#3', () => {
		it('Отображается ветка по умолчанию', () => {
			browser.url(url);

			let branchCurrent = browser.selectorExecute(currentBranchSelector, function(link) {
				return link.length;
			});

			browser.saveScreenshot('./screens/test3.png');

			assert(branchCurrent > 0);
		});
	});
});

describe('Просмотр ветки', () => {
	describe('Кликнуть на название ветки. Test#4', () => {
		it('По клику на название ветки должен перейти на страницу соответствующей ветки и сравнить заголовки', () => {
			browser.url(url);

			let branchName = goToBranch(currentBranchSelector);

			browser.saveScreenshot('./screens/test4.png');

			assert(browser.getTitle() === defaultTitle + '-branch-' + branchName);
		});
	});

	describe('Просмотр страницы ветки. Test#5', () => {
		it('По клику на ветку должен перейти на страницу соответствующей ветки и найти там коммиты и дерево файлов', () => {
			browser.url(url);

			let commits = false;
			let files = false;

			goToBranch(currentBranchSelector);

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

			browser.saveScreenshot('./screens/test5.png');

			assert(commits && files);

		});
	});

	describe('Работа с деревом файлов. Test#6', () => {
		it('должен открыть каталог найти там первый файл, перейти на страницу этого файла и проверить есть открылось ли его содержимое', () => {
			browser.url(url);

			let file = false;

			goToBranch(currentBranchSelector);

			let firstFolder = $$('li.files__directory')[0];

			firstFolder.click();

			let firstFile = $$('.files__file')[0];

			let firstFileLink;

			if (firstFile.isVisible()) {
				firstFileLink = $$('.files__file > a')[0];

				firstFileLink.scroll();

				firstFileLink.click();

				browser.pause(300);

				let pre = $('#file_pre');
				let isEx = pre.isExisting();
				
				if (isEx) {
					file = true;
				}

				browser.saveScreenshot('./screens/test6.png');
			}
			
			assert(file);

		});
	});
});

describe('Страница коммита', () => {
	describe('Переход на страницу коммита. Test#7', () => {
		it('По клику на название комиита должен перейти на страницу соответствующего коммита и сравнить заголовки', () => {
			browser.url(url);

			goToBranch(currentBranchSelector);

			let commitHash = goToFirstCommit();

			browser.saveScreenshot('./screens/test7.png');

			assert(browser.getTitle() === defaultTitle + '-commit-' + commitHash.substr(-6, 6));

		});
	});

	describe('Дерево файлов на странице коммита. Test#8', () => {
		it('Должно отобразиться дерево файлов', () => {
			browser.url(url);

			goToBranch(currentBranchSelector);

			goToFirstCommit();

			let isFilesBlock = findFilesBlock();

			browser.saveScreenshot('./screens/test8.png');

			assert(isFilesBlock);

		});
	});

	describe('Навигация на странице коммита. Test#9', () => {
		it('в хедере должны отобразиться правильные ветка и hash коммита', () => {
			browser.url(url);

			let branchFlag = false;
			let commitHashFlag = false;

			let branchName = goToBranch(currentBranchSelector);
			let commitHash = goToFirstCommit();

			let breadCrumbsItem = $$('.breadcrumbs__item');

			let breadCrumbsItemBranch = breadCrumbsItem[0].getText().toLowerCase();
			let breadCrumbsItemCommitHash = breadCrumbsItem[1].getText().toLowerCase();

			if (branchName === breadCrumbsItemBranch) {
				branchFlag = true;
			}

			if (commitHash === breadCrumbsItemCommitHash) {
				commitHashFlag = true;
			}

			browser.saveScreenshot('./screens/test9.png');

			assert(branchFlag && commitHashFlag);

		});
	});
});