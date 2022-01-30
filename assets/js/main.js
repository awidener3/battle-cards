import { createEncounter } from './createEncounter.js';
import { createNewPc } from './selectPc.js';

// * DOM ELEMENTS
const createEncounterBtn = document.querySelector('#create-encounter-btn');
const savedEncounterBtn = document.querySelector('#saved-encounter-btn');
const addPcBtn = document.querySelector('#add-pc-btn');
const addNpcBtn = document.querySelector('#add-npc-btn');
const addMonsterBtn = document.querySelector('#add-monster-btn');
const homeBtn = document.querySelector('#home-btn');
const footerNav = document.querySelector('#footer-navigation');

// * EVENT LISTENERS
createEncounterBtn.addEventListener('click', createEncounter);

homeBtn.addEventListener('click', function () {
	location.reload();
});

addPcBtn.addEventListener('click', () => {
	createNewPc();
});
