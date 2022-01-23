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

    if (pageIndex > 2) {
        printSummary();
        return;
    }

    headerTitle.textContent = 'CREATE NEW ENCOUNTER'
    let contentDiv = document.createElement('div');

    let text = document.createElement('p');

    let addBtn = document.createElement('button');
    addBtn.classList.add('btn', 'btn-primary', 'btn-lg', 'col-12');
    
    contentDiv.append(text, addBtn);
    mainEl.appendChild(contentDiv);

    // uses current pageIndex to dynamically change what is displayed
    switch (pageIndex) {
        case 0: // * pc's
            text.textContent = 'Select your players:';
            addBtn.textContent = '+ add new PC';

            createRow('Lvl ??', 'Saved PC 1', 'Init ??');

            break;

        case 1: // * npc's
            text.textContent = 'Select your NPC\'s:';
            addBtn.textContent = '+ add new NPC';

            createRow('CR ??', 'Saved NPC 1', 'Init ??');

            break;
            
        case 2: // * monsters
            text.textContent = 'Select your monster\'s';
            addBtn.textContent = '+ add new monster';

            createRow('# ??', 'MONSTER 1', 'Init ??');

            break;

        default:
            console.log('error');
    }

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

createRow = (info, title, initiative) => {
    let selectionDiv = document.createElement('div');
    selectionDiv.classList.add('container', 'mt-4')

    let selectionRow = document.createElement('div');
    selectionRow.classList.add('row', 'justify-content-center');

    let selectionInfo = document.createElement('div');
    selectionInfo.textContent = info;
    selectionInfo.classList.add('col-2', 'border', 'bg-secondary');

    let selectionName = document.createElement('div');
    selectionName.classList.add('col-7', 'border-top', 'border-bottom');
    selectionName.textContent = title;

    selectionName.addEventListener('click', function() {
        if (this.classList.contains('bg-success')) {
            this.classList.remove('bg-success');
        } else {
            this.classList.add('bg-success');
        }
    })

    let selectionInit = document.createElement('div');
    selectionInit.classList.add('col-2', 'border', 'bg-secondary');
    selectionInit.textContent = initiative;

    selectionRow.append(selectionInfo, selectionName, selectionInit);
    selectionDiv.appendChild(selectionRow);

    mainEl.appendChild(selectionDiv);
}

printSummary = () => {
    headerTitle.textContent = 'ENCOUNTER SUMMARY';

    // main content
    let summaryContent = document.createElement('div');

    let pcDiv = document.createElement('div');
    let pcHeader = document.createElement('h4');
    pcHeader.textContent = 'PC\'s:'
    pcDiv.append(pcHeader);
    
    let npcDiv = document.createElement('div');
    let npcHeader = document.createElement('h4');
    npcHeader.textContent = 'NPC\'s:'
    npcDiv.append(npcHeader);
    
    let monDiv = document.createElement('div');
    let monHeader = document.createElement('h4');
    monHeader.textContent = 'monsters\'s:'
    monDiv.append(monHeader);

    summaryContent.append(pcDiv, npcDiv, monDiv);
    mainEl.append(summaryContent);


    // bottom buttons

    let runBtn = document.createElement('button');
    runBtn.textContent = 'run battle >>';
    runBtn.classList.add('btn', 'btn-success', 'btn-lg', 'mb-1', 'col-12');
    runBtn.addEventListener('click', function() {
        // start encounter
    })

    footerNav.textContent = '';
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

    let clearBtn = document.createElement('button');
    clearBtn.textContent = 'clear';
    clearBtn.classList.add('btn');
    clearBtn.classList.add('btn-secondary');
    clearBtn.classList.add('col-5');
    clearBtn.addEventListener('click', function() {
        pageIndex = 0;
        renderCreateEncounter();
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