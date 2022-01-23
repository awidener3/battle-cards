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

// renders the create encounter section of the application
renderCreateEncounter = () => {
    mainEl.textContent = '';
    headerTitle.textContent = 'CREATE NEW ENCOUNTER'
    let contentDiv = document.createElement('div');

    let text = document.createElement('p');

    let addBtn = document.createElement('button');
    addBtn.classList.add('btn');
    addBtn.classList.add('btn-primary');
    addBtn.classList.add('btn-lg');
    addBtn.classList.add('col-12');

    let selectionDiv = document.createElement('div');
    selectionDiv.classList.add('container');
    selectionDiv.classList.add('mt-4');

    let selectionRow = document.createElement('div');
    selectionRow.classList.add('row');
    selectionRow.classList.add('justify-content-center');

    let selectionInfo = document.createElement('div');
    selectionInfo.classList.add('col-2');
    selectionInfo.classList.add('border');
    selectionInfo.classList.add('bg-secondary');

    let selectionName = document.createElement('div');
    selectionName.classList.add('col-7');
    selectionName.classList.add('border-top');
    selectionName.classList.add('border-bottom');

    let selectionInit = document.createElement('div');
    selectionInit.classList.add('col-2');
    selectionInit.classList.add('border');
    selectionInit.classList.add('bg-secondary');
    selectionInit.textContent = 'Init ??';

    // uses current pageIndex to dynamically change what is displayed
    switch (pageIndex) {
        case 0: // * pc's
            console.log('page 0');
            text.textContent = 'Select your players:';
            addBtn.textContent = '+ add new PC';

            selectionInfo.textContent = 'Lvl ??';

            selectionName.textContent = 'saved PC 1';

            selectionName.addEventListener('click', function() {
                if (this.classList.contains('bg-success')) {
                    this.classList.remove('bg-success');
                } else {
                    this.classList.add('bg-success');
                }
            })

            break;

        case 1: // * npc's
            console.log(`page 1`);
            text.textContent = 'Select your NPC\'s:';
            addBtn.textContent = '+ add new NPC';

            selectionInfo.textContent = 'CR ??';

            selectionName.textContent = 'saved NPC 1';

            selectionName.addEventListener('click', function() {
                if (this.classList.contains('bg-success')) {
                    this.classList.remove('bg-success');
                } else {
                    this.classList.add('bg-success');
                }
            })
            break;
            
        case 2: // * monsters
            console.log(`page 2`);
            text.textContent = 'Select your monster\'s';
            addBtn.textContent = '+ add new monster';

            selectionInfo.textContent = '# ##';

            selectionName.textContent = 'MONSTER';
            break;
        
        case 3: // * summary
            printSummary();
            return;

        default:
            console.log('error');
    }

    contentDiv.appendChild(text);
    contentDiv.appendChild(addBtn);
    mainEl.appendChild(contentDiv);

    selectionRow.appendChild(selectionInfo);
    selectionRow.appendChild(selectionName);
    selectionRow.appendChild(selectionInit);

    selectionDiv.appendChild(selectionRow);

    mainEl.appendChild(selectionDiv);

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

printSummary = () => {
    headerTitle.textContent = 'ENCOUNTER SUMMARY';

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