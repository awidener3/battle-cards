const selectionDiv = document.querySelector('#page-selections');

let storedPc;
let stagedArr = [];

export const updateStoredPc = () => {
	if (storedPc !== null) {
		storedPc = JSON.parse(localStorage.getItem('playerCharacter'))
	} else {
		storedPc = [];
	}
};

export const printPc = () => {
	updateStoredPc();

	for (let i = 0; i < storedPc.length; i++) {
		createCharacterRow(
			storedPc[i],
			i // this is used for dataset index
		);
	}

	// handles close button on each row
	let closeBtns = document.querySelectorAll('.close');

	for (let i = 0; i < closeBtns.length; i++) {
		closeBtns[i].addEventListener('click', (e) => {
			e.stopPropagation();

			if (confirm('Are you sure you want to delete?')) {
				this.parentElement.parentElement.remove(); //remove from page
				let index = this.parentElement.parentElement.dataset.index;
				let pcArray = JSON.parse(
					localStorage.getItem('playerCharacter')
				);
				pcArray.splice(index, 1); // remove from local storage
				localStorage.setItem(
					'playerCharacter',
					JSON.stringify(pcArray)
				);
			}
		});
	}
};

const createCharacterRow = (object, index) => {
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
