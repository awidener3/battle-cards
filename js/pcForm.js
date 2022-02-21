import { Pc } from './classes/pc.js';

const addBtn = document.querySelector('#add-btn');
const cancelBtn = document.querySelector('#cancel-btn');

let storedPc;

const updateStoredPc = () => {
	if (storedPc !== null) {
		storedPc = JSON.parse(localStorage.getItem('playerCharacter'));
	} else {
		storedPc = [];
	}
};

addBtn.addEventListener('click', function () {
	console.log('click');
	updateStoredPc();

	let pcName = document.querySelector('#pcNameInput').value;
	let pcClass = document.querySelector('#pcClassInput').value;
	let pcLevel = document.querySelector('#pcLevelInput').value;

	const player = new Pc(pcName, pcClass, pcLevel);
	storedPc.push(player);
	localStorage.setItem('playerCharacter', JSON.stringify(storedPc));

	location.pathname = '/html/create-encounter.html';
});

cancelBtn.addEventListener('click', function () {
	location.pathname = '/html/create-encounter.html';
});
