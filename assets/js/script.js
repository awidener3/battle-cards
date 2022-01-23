// * DOM ELEMENTS
const headerTitle = document.querySelector('#header-title')
const mainEl = document.querySelector('main');
const createEncounterBtn = document.querySelector('#create-encounter-btn');
const savedEncounterBtn = document.querySelector('#saved-encounter-btn');
const addPcBtn = document.querySelector('#add-pc-btn');
const addNpcBtn = document.querySelector('#add-npc-btn');
const addMonsterBtn = document.querySelector('#add-monster-btn');
const homeBtn = document.querySelector('#home-btn');
const footerNav = document.querySelector('#footer-navigation')

// * GLOBAL VARIABLES
// controls current page and what is displayed
let pageIndex = 0;

// * FUNCTIONS
renderCreateEncounter = () => {
    mainEl.textContent = '';
    headerTitle.textContent = 'CREATE NEW ENCOUNTER'
    let contentDiv = document.createElement('div');
    let text = document.createElement('p');

    // uses current pageIndex to dynamically change what is displayed
    switch (pageIndex) {
        case 0:
            console.log('page 0');
            text.textContent = 'Select your players:';
            break;
        case 1:
            console.log(`page 1`);
            text.textContent = 'Select your NPC\'s:';
            break;
        case 2:
            text.textContent = 'Select your monster\'s';
            break;
            
        default:
            console.log('error');
    }

    contentDiv.appendChild(text);

    let addPlayerBtn = document.createElement('button');
    addPlayerBtn.textContent = '+ add new PC';
    addPlayerBtn.classList.add('btn');
    addPlayerBtn.classList.add('btn-primary');
    addPlayerBtn.classList.add('btn-lg');
    addPlayerBtn.classList.add('col-12');
    contentDiv.appendChild(addPlayerBtn);

    mainEl.appendChild(contentDiv);

    // ? saved pc's

    let pcDiv = document.createElement('div');
    pcDiv.classList.add('container')
    pcDiv.classList.add('mt-4')
    
    let pcRow = document.createElement('div');
    pcRow.classList.add('row')
    pcRow.classList.add('justify-content-center')

    let pcLvl = document.createElement('div');
    pcLvl.classList.add('col-2');
    pcLvl.classList.add('border');
    pcLvl.classList.add('bg-secondary');
    pcLvl.textContent = 'Lvl ??';
    pcRow.appendChild(pcLvl);

    let pcName = document.createElement('div');
    pcName.classList.add('col-7')
    pcName.classList.add('border-top')
    pcName.classList.add('border-bottom')
    pcName.textContent = 'saved PC 1';
    pcName.addEventListener('click', function() {
        if (this.classList.contains('bg-success')) {
            this.classList.remove('bg-success');
        } else {
            this.classList.add('bg-success');
        }
    })
    pcRow.appendChild(pcName);

    let pcInit = document.createElement('div');
    pcInit.classList.add('col-2');
    pcInit.classList.add('border');
    pcInit.classList.add('bg-secondary');
    pcInit.textContent = 'Init ??';
    pcRow.appendChild(pcInit);

    pcDiv.appendChild(pcRow);

    mainEl.appendChild(pcDiv);

    //? footer manipulation

    footerNav.textContent = '';
    let prevBtn = document.createElement('button');
    prevBtn.textContent = '<< prev';
    prevBtn.classList.add('btn');
    prevBtn.classList.add('btn-secondary');
    prevBtn.classList.add('col-5');
    prevBtn.addEventListener('click', function() {
        if (pageIndex === 0) {
            location.reload();
        } else {
            pageIndex--;
            renderCreateEncounter();
        }
    })
    footerNav.appendChild(prevBtn);

    let nextBtn = document.createElement('button');
    nextBtn.textContent = 'next >>';
    nextBtn.classList.add('btn');
    nextBtn.classList.add('btn-secondary');
    nextBtn.classList.add('col-5');
    nextBtn.addEventListener('click', function() {
        pageIndex++;
        renderCreateEncounter();
    })
    // ! increase index count

    footerNav.appendChild(nextBtn);
}

// createEncounterPageTwo = () => {
//     mainEl.textContent = '';

//     let contentDiv = document.createElement('div');

//     let text = document.createElement('p');
//     text.textContent = 'Select your NPC\'s:'
//     contentDiv.appendChild(text);

//     let addNpcBtn = document.createElement('button');
//     addNpcBtn.textContent = '+ add new NPC';
//     addNpcBtn.classList.add('btn');
//     addNpcBtn.classList.add('btn-primary');
//     addNpcBtn.classList.add('btn-lg');
//     addNpcBtn.classList.add('col-12');
//     contentDiv.appendChild(addNpcBtn);

//     mainEl.appendChild(contentDiv);
// }

// * EVENT LISTENERS
createEncounterBtn.addEventListener('click', renderCreateEncounter);

homeBtn.addEventListener('click', function() {location.reload()});