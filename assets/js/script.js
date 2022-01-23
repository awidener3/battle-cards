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
    addBtn.classList.add('btn', 'btn-primary', 'btn-lg', 'col-12');

    let selectionDiv = document.createElement('div');
    selectionDiv.classList.add('container', 'mt-4')

    let selectionRow = document.createElement('div');
    selectionRow.classList.add('row', 'justify-content-center');

    let selectionInfo = document.createElement('div');
    selectionInfo.classList.add('col-2', 'border', 'bg-secondary');

    let selectionName = document.createElement('div');
    selectionName.classList.add('col-7', 'border-top', 'border-bottom');

    let selectionInit = document.createElement('div');
    selectionInit.classList.add('col-2', 'border', 'bg-secondary');
    selectionInit.textContent = 'Init ??';

    // uses current pageIndex to dynamically change what is displayed
    switch (pageIndex) {
        case 0: // * pc's
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
            text.textContent = 'Select your monster\'s';
            addBtn.textContent = '+ add new monster';
            selectionInfo.textContent = '# ##';
            selectionName.textContent = 'MONSTER';
            break;
        
        case 3: // * summary
            printSummary();
            return; // leaves the function to print summary

        default:
            console.log('error');
    }

    // append all info
    contentDiv.append(text, addBtn);
    mainEl.appendChild(contentDiv);
    selectionRow.append(selectionInfo, selectionName, selectionInit);
    selectionDiv.appendChild(selectionRow);
    mainEl.appendChild(selectionDiv);

    // navigation buttons
    footerNav.textContent = '';

    // previous page
    let prevBtn = document.createElement('button');
    prevBtn.textContent = '<< prev';
    prevBtn.classList.add('btn', 'btn-secondary', 'col-5');
    prevBtn.addEventListener('click', function() {
        if (pageIndex === 0) {
            location.reload();
        } else {
            pageIndex--;
            renderCreateEncounter();
        }
    })

    // next page
    let nextBtn = document.createElement('button');
    nextBtn.textContent = 'next >>';
    nextBtn.classList.add('btn', 'btn-secondary', 'col-5');
    nextBtn.addEventListener('click', function() {
        pageIndex++;
        renderCreateEncounter();
    })
    
    footerNav.append(prevBtn, nextBtn);

    let difficultyMeter = document.createElement('div');
    let meterText = document.createElement('p');
    meterText.textContent = 'DIFFICULTY';

    // color will change with function that calculates difficulty
    difficultyMeter.classList.add('alert', 'alert-success', 'mt-2');
    meterText.classList.add('text-center', 'm-0');

    difficultyMeter.append(meterText);
    footerNav.append(difficultyMeter);
    footerNav.append(prevBtn, nextBtn);
}

printSummary = () => {
    headerTitle.textContent = 'ENCOUNTER SUMMARY';

    let runBtn = document.createElement('button');
    runBtn.textContent = 'run battle >>';
    runBtn.classList.add('btn');
    runBtn.classList.add('btn-success');
    runBtn.classList.add('btn-lg');
    runBtn.classList.add('mb-1');
    runBtn.classList.add('col-12');
    runBtn.addEventListener('click', function() {
        // start encounter
    })

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

    let clearBtn = document.createElement('button');
    clearBtn.textContent = 'clear';
    clearBtn.classList.add('btn');
    clearBtn.classList.add('btn-secondary');
    clearBtn.classList.add('col-5');
    clearBtn.addEventListener('click', function() {
        // clear saved and go back to beginning
    })

    let difficultyMeter = document.createElement('div');
    let meterText = document.createElement('p');
    meterText.textContent = 'DIFFICULTY';

    // color will change with function that calculates difficulty
    difficultyMeter.classList.add('alert', 'alert-success', 'mt-2');
    meterText.classList.add('text-center', 'm-0');

    difficultyMeter.append(meterText);
    
    footerNav.appendChild(runBtn);
    footerNav.append(difficultyMeter);
    footerNav.appendChild(prevBtn);
    footerNav.appendChild(clearBtn);
}

// * EVENT LISTENERS
createEncounterBtn.addEventListener('click', renderCreateEncounter);

homeBtn.addEventListener('click', function() {location.reload()});