import { Pc } from './pc.js';
import { createEncounter, checkStoredPc } from './createEncounter.js';

const mainEl = document.querySelector('main');
const footerNav = document.querySelector('#footer-navigation');
const headerTitle = document.querySelector('#header-title');

let storedPc;
let stagedArr = [];

// ? ####### MAIN PAGE ########

export const printPc = () => {
	storedPc = checkStoredPc();

	for (let i = 0; i < storedPc.length; i++) {
		createCharacterRow(
			storedPc[i],
			i // this is used for dataset index
		);
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
};

const createCharacterRow = (object, index) => {
	let selectionDiv = document.querySelector('#selection-div');

	let row = `
        <div class="player-level col border bg-light d-flex flex-column justify-content-center align-items-center">
            <p class="m-0 text-dark">Lvl</p>
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

// ? ####### CREATE PC ########

export const createNewPc = () => {
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
