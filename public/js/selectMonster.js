import { Monster } from './classes/monster.js';
import { renderContent, updateStoredMonster } from './createEncounter.js';

const mainEl = document.querySelector('main');
const footerNav = document.querySelector('#footer-navigation');
const headerTitle = document.querySelector('#header-title');

let storedMonster;
let stagedMon = [];

// ? ####### MAIN PAGE ########
// prints the main page for searching and selecting monsters
export const printMonsters = () => {
	storedMonster = updateStoredMonster();

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

	let numberInput = document.querySelector('#monster-num');

	numberInput.addEventListener('change', console.log(numberInput.value));
};
