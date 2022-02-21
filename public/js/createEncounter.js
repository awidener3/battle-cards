const headerTitle = document.querySelector('#header-title');
const pageText = document.querySelector('#page-text');
const searchAddBtn = document.querySelector('#search-add-btn');
const contentContainer = document.querySelector('#page-selections');
const nextBtn = document.querySelector('#next-btn');
const backBtn = document.querySelector('#back-btn');

let pageIndex = 0;
let storedPc;
let storedMonster;
let stagedPc = [];

// Renders the content based on page index
export const renderContent = () => {
	updateStoredPc();

	switch (pageIndex) {
		case 0:
			pageText.textContent = "Select your PC's:";
			searchAddBtn.textContent = 'add new PC';
			searchAddBtn.addEventListener('click', () => {
				location.pathname = '/html/create-player.html';
			});
			// Clear content
			contentContainer.textContent = '';
			printPc();

			break;

		case 1:
			pageText.textContent = 'Select your Monsters:';
			searchAddBtn.textContent = 'search monsters';
			// searchAddBtn.addEventListener('click', searchMonster);

			// Clear content
			contentContainer.textContent = '';

			// printMonsters();

			break;
		case 2:
			printSummary();

			break;
		default:
			console.log('error');
	}
};

// Back page button
backBtn.addEventListener('click', function () {
	if (pageIndex === 0) {
		location.pathname = '/index.html';
	} else {
		pageIndex--;
		renderContent();
	}
});

// Next page button
nextBtn.addEventListener('click', function () {
	pageIndex++;
	renderContent();
});

// Summary

const printSummary = () => {
	storedPc = updateStoredPc();
	storedMonster = updateStoredMonster();

	headerTitle.textContent = 'ENCOUNTER SUMMARY';

	// main content
	let summaryContent = document.createElement('div');

	let pcDiv = document.createElement('div');
	let pcHeader = document.createElement('h4');
	pcHeader.textContent = "PC's:";
	pcDiv.append(pcHeader);

	let monDiv = document.createElement('div');
	let monHeader = document.createElement('h4');
	monHeader.textContent = 'Monsters:';
	monDiv.append(monHeader);

	summaryContent.append(pcDiv, monDiv);
	mainEl.append(summaryContent);

	// bottom buttons
	let saveBtn = document.createElement('button');
	saveBtn.textContent = 'save encounter';
	saveBtn.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-1', 'col-5');
	saveBtn.addEventListener('click', function () {
		// save
	});

	let runBtn = document.createElement('button');
	runBtn.textContent = 'run battle >>';
	runBtn.classList.add('btn', 'btn-success', 'btn-lg', 'mb-1', 'col-5');
	runBtn.addEventListener('click', function () {
		// start encounter
	});

	// difficulty meter
	let difficultyMeter = document.createElement('div');
	let meterText = document.createElement('p');
	meterText.textContent = 'DIFFICULTY';

	// color will change with function that calculates difficulty
	difficultyMeter.classList.add('alert', 'alert-success', 'mt-2');
	meterText.classList.add('text-center', 'm-0');

	difficultyMeter.append(meterText);

	// clear buttons
	footerNav.textContent = '';
	let prevBtn = document.createElement('button');
	prevBtn.textContent = '<< prev';
	prevBtn.classList.add('btn', 'btn-secondary', 'col-5');
	prevBtn.addEventListener('click', function () {
		if (pageIndex === 0) {
			location.reload();
		} else {
			pageIndex--;
			renderContent();
		}
	});

	let clearBtn = document.createElement('button');
	clearBtn.textContent = 'clear';
	clearBtn.classList.add('btn', 'btn-secondary', 'col-5');
	clearBtn.addEventListener('click', function () {
		pageIndex = 0;
		renderContent();
	});

	footerNav.append(saveBtn, runBtn, difficultyMeter, prevBtn, clearBtn);
};

renderContent();
