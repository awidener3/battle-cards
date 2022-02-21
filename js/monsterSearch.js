const searchBtn = document.querySelector('#monster-search-btn');
const searchInput = document.querySelector('#monster-search');
const addMonBtn = document.querySelector('#add-mon-btn');

let stagedMon = [];

// prints the search monster screen where user will make a fetch
const searchMonster = () => {
	let backBtn = document.createElement('button');
	backBtn.textContent = 'Back';
	backBtn.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-2', 'col-12');
	backBtn.addEventListener('click', function () {
		createEncounter();
	});

	footerNav.append(addMonsterBtn, backBtn);
};

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

searchBtn.addEventListener('click', () => {
	fetchMonsters(searchInput.value);
});

addMonBtn.addEventListener('click', function () {
	stagedMon.forEach((mon) => {
		const savedMonster = new Monster(
			mon.name,
			mon.hit_points,
			mon.armor_class
		);
		storedMonster.push(savedMonster);
		localStorage.setItem('savedMonster', JSON.stringify(storedMonster));
	});

	// location.pathname = '/html/create-encounter.html';
});
