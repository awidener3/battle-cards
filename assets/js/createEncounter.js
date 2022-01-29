import { Pc } from './pc.js';

const headerTitle = document.querySelector('#header-title');
const mainEl = document.querySelector('main');
const footerNav = document.querySelector('#footer-navigation');

let pageIndex = 0;
let stagedArr = [];
let storedPc = [];

const checkStoredPc = () => {
	storedPc = JSON.parse(localStorage.getItem('playerCharacter'));
	if (storedPc == null) {
		storedPc = [];
	}
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

	// uses current pageIndex to dynamically change what is displayed
	switch (pageIndex) {
		case 0: // * pc's
			text.textContent = "Select your PC's:";
			addBtn.textContent = '+ add new PC';
			addBtn.addEventListener('click', createNewPc);

			for (let i = 0; i < storedPc.length; i++) {
				createRow(
					storedPc[i],
					i // this is used for dataset index
				);
			}

			break;

		case 1: // * monsters
			text.textContent = "Select your monster's";
			addBtn.textContent = '+ add new monster';

			createRow('??', 'MONSTER 1', 'type');

			break;

		default:
			console.log('error');
	}

	// handles close button on each row
	let closeBtns = document.querySelectorAll('.close');

	for (let i = 0; i < closeBtns.length; i++) {
		closeBtns[i].addEventListener('click', function (e) {
			e.stopPropagation();

			if (confirm('Are you sure you want to delete?')) {
				// remove from page
				this.parentElement.parentElement.remove();
				// remove from local storage
				let index = this.parentElement.parentElement.dataset.index;
				let pcArray = JSON.parse(
					localStorage.getItem('playerCharacter')
				);
				pcArray.splice(index, 1);
				localStorage.setItem(
					'playerCharacter',
					JSON.stringify(pcArray)
				);
			}
		});
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

const createRow = (object, index) => {
	let selectionDiv = document.querySelector('#selection-div');
	let infoText;

	pageIndex === 0 ? (infoText = 'Lvl') : (infoText = '#');

	let row = `
        <div class="player-level col border bg-light d-flex flex-column justify-content-center align-items-center">
            <p class="m-0 text-dark">${infoText}</p>
            <p class="m-0 text-dark">${object.pcLevel}</p>
        </div>
        <div class="row-title col-9 border d-flex align-items-center">
            <div>
            <h5 class="m-0">${object.pcName}</h5>
            <p class="m-0">${object.pcClass}</p>
            </div>
            <span class="close">x</span>
        </div>
	`;

	let div = document.createElement('div');
	div.classList.add('row', 'justify-content-center', 'my-2');
	div.dataset.index = index;
	div.insertAdjacentHTML('beforeend', row);

	// stages a character for the encounter
	div.addEventListener('click', function () {
		if (div.classList.contains('selected')) {
			div.classList.remove('selected');
			stagedArr.splice(
				stagedArr.findIndex((e) => e.pcName === object.pcName),
				1
			);
		} else {
			div.classList.add('selected');
			stagedArr.push(object);
		}
	});

	selectionDiv.append(div);
};

const printSummary = () => {
	headerTitle.textContent = 'ENCOUNTER SUMMARY';

	// main content
	let summaryContent = document.createElement('div');

	let pcDiv = document.createElement('div');
	let pcHeader = document.createElement('h4');
	pcHeader.textContent = "PC's:";
	pcDiv.append(pcHeader);

	let npcDiv = document.createElement('div');
	let npcHeader = document.createElement('h4');
	npcHeader.textContent = "NPC's:";
	npcDiv.append(npcHeader);

	let monDiv = document.createElement('div');
	let monHeader = document.createElement('h4');
	monHeader.textContent = "monsters's:";
	monDiv.append(monHeader);

	summaryContent.append(pcDiv, npcDiv, monDiv);
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

const createNewPc = () => {
	mainEl.textContent = '';
	footerNav.textContent = '';
	headerTitle.textContent = 'CREATE NEW PC';

	let form = `
    <form autocomplete="off">
        <div class="mb-3">
            <label for="pcNameInput" class="form-label">PC Name:</label>
            <input type=text class="form-control" id="pcNameInput" placeholder="Type a name...">
        </div>
        <div class="mb-3">
            <label for="pcClassInput" class="form-label">PC Class:</label>
            <select class="form-select" id="pcClassInput" aria-label="Possible classes">
                <option selected>Choose a class</option>
                <option value="🪓 Barbarian"> 🪓 Barbarian</option>
                <option value="🎼 Bard"> 🎼 Bard</option>
                <option value="🙏 Cleric">🙏 Cleric</option>
                <option value="🌱 Druid">🌱 Druid</option>
                <option value="🤺 Fighter">🤺 Fighter</option>
                <option value="👊 Monk">👊 Monk</option>
                <option value="⛪ Paladin">⛪ Paladin</option>
                <option value="🏹 Ranger">🏹 Ranger</option>
                <option value="🔪 Rogue">🔪 Rogue</option>
                <option value="🎇 Sorcerer">🎇 Sorcerer</option>
                <option value="👿 Warlock">👿 Warlock</option>
                <option value="📔 Wizard">📔 Wizard</option>
                <option value="🔨 Artificer">🔨 Artificer</option>
                <option value="❓ Other">❓ Other</option>
            </select>
        </div>
        <div class="mb-3">
            <label for"pcLevelInput" class"form-label">PC Level:</label>
            <select class="form-select" id="pcLevelInput" aria-label="PC Level">
                <option selected>Choose a level</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
            </select>
        </div>
    </form>
    `;

	mainEl.innerHTML = form;

	let backBtn = document.createElement('button');
	backBtn.textContent = 'Back';
	backBtn.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-2', 'col-12');
	backBtn.addEventListener('click', function () {
		createEncounter();
	});

	let addPcBtn = document.createElement('button');
	addPcBtn.textContent = 'Add PC';
	addPcBtn.classList.add('btn', 'btn-success', 'btn-lg', 'mb-1', 'col-12');
	addPcBtn.addEventListener('click', function () {
		let pcName = document.querySelector('#pcNameInput').value;
		let pcClass = document.querySelector('#pcClassInput').value;
		let pcLevel = document.querySelector('#pcLevelInput').value;

		const player = new Pc(pcName, pcClass, pcLevel);
		storedPc.push(player);
		localStorage.setItem('playerCharacter', JSON.stringify(storedPc));

		createEncounter();
	});

	footerNav.append(addPcBtn, backBtn);
};
