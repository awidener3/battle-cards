// import { createEncounter } from './createEncounter.js';
import { createNewPc } from './selectPc.js';

// DOM elements
const createEncounterBtn = document.querySelector('#create-encounter-btn');
const addPcBtn = document.querySelector('#add-pc-btn');
// const savedEncounterBtn = document.querySelector('#saved-encounter-btn');
// const addNpcBtn = document.querySelector('#add-npc-btn');
// const addMonsterBtn = document.querySelector('#add-monster-btn');
// const footerNav = document.querySelector('#footer-navigation');

addPcBtn.addEventListener('click', () => {
	createNewPc();
});
