import { Monster } from './monster.js';
import { createEncounter, checkStoredMonster } from './createEncounter.js';

const mainEl = document.querySelector('main');
const footerNav = document.querySelector('#footer-navigation');
const headerTitle = document.querySelector('#header-title');

let storedMonster;
let stagedMon = [];

// ? ####### MAIN PAGE ########
// prints the main page for searching and selecting monsters
export const printMonsters = () => {
	storedMonster = checkStoredMonster();

	for (let i = 0; i < storedMonster.length; i++) {
		createMonsterRow(storedMonster[i], i);
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
				let monsterArray = JSON.parse(
					localStorage.getItem('savedMonster')
				);
				monsterArray.splice(index, 1);
				localStorage.setItem(
					'savedMonster',
					JSON.stringify(monsterArray)
				);
			}
		});
	}
};

const createMonsterRow = (monster, index) => {
	let selectionDiv = document.querySelector('#selection-div');

	let row = `
	    <div class="enemy-number col border bg-light d-flex flex-column justify-content-center align-items-center p-3">
            <form>
                <input type="number" id="monster-num" class="form-control" placeholder="1">
            </form>
	    </div>
	    <div class="row-title col-9 border d-flex align-items-center">
	        <div>
	        <h5 class="m-0">${monster.name}</h5>
	        </div>
	        <span class="close">x</span>
	    </div>
	`;

	let div = document.createElement('div');
	div.classList.add('row', 'justify-content-center', 'my-2');
	div.dataset.index = index;
	div.insertAdjacentHTML('beforeend', row);

	selectionDiv.append(div);
};

// ? ####### SEARCH ########

// prints the search monster screen where user will make a fetch
export const searchMonster = () => {
	mainEl.textContent = '';
	footerNav.textContent = '';
	headerTitle.textContent = 'MONSTER SEARCH';

	let form = `
	<form>
	<label for="monster-search" class="form-label">Search</label>
	<input type="text" class="form-control mb-3" id="monster-search">
	<a id="monster-search-btn" class="btn btn-primary btn-block">Search...</a>
	</form>
	`;

	mainEl.innerHTML = form;

	let monsterDiv = document.createElement('div');
	monsterDiv.classList.add('container', 'mt-4');
	monsterDiv.setAttribute('id', 'monster-div');

	mainEl.appendChild(monsterDiv);

	let searchBtn = document.querySelector('#monster-search-btn');
	let searchInput = document.querySelector('#monster-search');

	searchBtn.addEventListener('click', () => {
		fetchMonsters(searchInput.value);
	});

	let addMonsterBtn = document.createElement('button');
	addMonsterBtn.textContent = 'Add Monster';
	addMonsterBtn.classList.add(
		'btn',
		'btn-success',
		'btn-lg',
		'mb-1',
		'col-12'
	);

	addMonsterBtn.addEventListener('click', function () {
		stagedMon.forEach((mon) => {
			const savedMonster = new Monster(
				mon.name,
				mon.hit_points,
				mon.armor_class
			);
			storedMonster.push(savedMonster);
			localStorage.setItem('savedMonster', JSON.stringify(storedMonster));
		});

		createEncounter();
	});

	footerNav.append(addMonsterBtn);

	let backBtn = document.createElement('button');
	backBtn.textContent = 'Back';
	backBtn.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-2', 'col-12');
	backBtn.addEventListener('click', function () {
		createEncounter();
	});

	footerNav.append(addMonsterBtn, backBtn);
};

// ? ####### FETCH ########

// calls the Open5e API
const fetchMonsters = (search) => {
	fetch(`https://api.open5e.com/monsters/?search=${search}`)
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.results.length; i++) {
				renderFetch(data.results[i]);
			}
		});
};

// prints results of API call
const renderFetch = (monster) => {
	let monsterDiv = document.querySelector('#monster-div');

	let row = `
	    <div class="col-12 border d-flex align-items-center p-2">
	        <h5 class="m-0">${monster.name}</h5>
	    </div>
	`;

	let div = document.createElement('div');
	div.classList.add('row', 'justify-content-center', 'my-2');
	div.insertAdjacentHTML('beforeend', row);

	monsterDiv.append(div);

	// stages a monster for the encounter
	div.addEventListener('click', function () {
		if (div.classList.contains('selected')) {
			div.classList.remove('selected');
			stagedMon.splice(
				stagedMon.findIndex((e) => e.name === monster.name),
				1
			);
		} else {
			div.classList.add('selected');
			stagedMon.push(monster);
		}
	});
};
