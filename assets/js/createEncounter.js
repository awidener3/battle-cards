import { printPc, createNewPc } from './selectPc.js';
import { printMonsters, searchMonster } from './selectMonster.js';

const headerTitle = document.querySelector('#header-title');
const mainEl = document.querySelector('main');
const footerNav = document.querySelector('#footer-navigation');

let pageIndex = 0;
// let stagedMon = [];
let storedPc = [];
let storedMonster = [];

export const checkStoredPc = () => {
	storedPc = JSON.parse(localStorage.getItem('playerCharacter'));
	if (storedPc == null) {
		storedPc = [];
	}

	return storedPc;
};

export const checkStoredMonster = () => {
	storedMonster = JSON.parse(localStorage.getItem('savedMonster'));
	if (storedMonster == null) {
		storedMonster = [];
	}

	return storedMonster;
};

// renders the create encounter section of the application
export const createEncounter = () => {
	mainEl.textContent = '';

	// pushes to summary page before adding any elements below
	if (pageIndex > 1) {
		printSummary();
		return;
	}

	headerTitle.textContent = 'CREATE NEW ENCOUNTER';
	let contentDiv = document.createElement('div');
	let text = document.createElement('p');
	text.classList.add('col-12');
	let addBtn = document.createElement('button');
	addBtn.classList.add('btn', 'btn-primary', 'btn-lg', 'col-12');

	contentDiv.append(text, addBtn);
	mainEl.appendChild(contentDiv);

	let selectionDiv = document.createElement('div');
	selectionDiv.classList.add('container', 'mt-4');
	selectionDiv.setAttribute('id', 'selection-div');

	mainEl.appendChild(selectionDiv);

	checkStoredPc();
	checkStoredMonster();

	// uses current pageIndex to dynamically change what is displayed
	switch (pageIndex) {
		case 0: // * pc's
			text.textContent = "Select your PC's:";
			addBtn.textContent = '+ add new PC';
			addBtn.addEventListener('click', createNewPc);

			printPc();

			break;

		case 1: // * monsters
			text.textContent = 'Select your Monsters:';
			addBtn.textContent = '+ search for a monster';
			addBtn.addEventListener('click', searchMonster);

			printMonsters();

			break;

		default:
			console.log('error');
	}

	// navigation buttons
	footerNav.textContent = '';

	// previous page
	let prevBtn = document.createElement('button');
	prevBtn.textContent = '<< prev';
	prevBtn.classList.add('btn', 'btn-secondary', 'col-5');
	prevBtn.addEventListener('click', function () {
		if (pageIndex === 0) {
			location.reload();
		} else {
			pageIndex--;
			createEncounter();
		}
	});

	// next page
	let nextBtn = document.createElement('button');
	nextBtn.textContent = 'next >>';
	nextBtn.classList.add('btn', 'btn-secondary', 'col-5');
	nextBtn.addEventListener('click', function () {
		pageIndex++;
		createEncounter();
	});

	footerNav.append(prevBtn, nextBtn);

	let difficultyMeter = document.createElement('div');
	let meterText = document.createElement('p');
	meterText.textContent = 'DIFFICULTY';

	// color will change with function that calculates difficulty
	difficultyMeter.classList.add('alert', 'alert-success', 'mt-2');
	meterText.classList.add('text-center', 'm-0');

	difficultyMeter.append(meterText);
	footerNav.append(difficultyMeter);
	footerNav.append(prevBtn, nextBtn);
};

// ! ####### SUMMARY #######

const printSummary = () => {
	storedPc = checkStoredPc();
	storedMonster = checkStoredMonster();

	headerTitle.textContent = 'ENCOUNTER SUMMARY';

	// main content
	let summaryContent = document.createElement('div');

	let pcDiv = document.createElement('div');
	let pcHeader = document.createElement('h4');
	pcHeader.textContent = "PC's:";
	pcDiv.append(pcHeader);

	let pcUl = document.createElement('ul');
	storedPc.forEach((pc) => {
		let li = document.createElement('li');
		li.textContent = `${pc.pcName} (${pc.pcClass}) -- Lvl. ${pc.pcLevel}`;

		pcUl.append(li);
	});
	pcDiv.append(pcUl);

	// -----------------------------------------

	let monDiv = document.createElement('div');
	let monHeader = document.createElement('h4');
	monHeader.textContent = 'Monsters:';
	monDiv.append(monHeader);

	let monUl = document.createElement('ul');
	storedMonster.forEach((mon) => {
		let li = document.createElement('li');
		li.textContent = `${mon.name}`;

		monUl.append(li);
	});
	monDiv.append(monUl);

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
			createEncounter();
		}
	});

	let clearBtn = document.createElement('button');
	clearBtn.textContent = 'clear';
	clearBtn.classList.add('btn', 'btn-secondary', 'col-5');
	clearBtn.addEventListener('click', function () {
		pageIndex = 0;
		createEncounter();
	});

	footerNav.append(saveBtn, runBtn, difficultyMeter, prevBtn, clearBtn);
};
