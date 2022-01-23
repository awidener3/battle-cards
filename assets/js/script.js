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
const savedPc = [];

// * CONSTRUCTORS

class Pc {
    constructor(pcName, pcClass, pcLevel) {
        this.pcName = pcName;
        this.pcClass = pcClass;
        this.pcLevel = pcLevel;
    }
}

// * FUNCTIONS

// renders the create encounter section of the application
renderCreateEncounter = () => {
    mainEl.textContent = '';

    if (pageIndex > 2) {
        printSummary();
        return;
    }

    headerTitle.textContent = 'CREATE NEW ENCOUNTER';
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
            addBtn.addEventListener('click', createNewPc);

            // rows will dynamically update depending on saved/created/searched pc's/npc's/monsters
            for (let i = 0; i < savedPc.length; i++) {
                createRow(savedPc[i].pcLevel, savedPc[i].pcName, `Init ??`);
            }

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
    clearBtn.classList.add('btn', 'btn-secondary', 'col-5');
    clearBtn.addEventListener('click', function() {
        pageIndex = 0;
        renderCreateEncounter();
    })

    let difficultyMeter = document.createElement('div');
    let meterText = document.createElement('p');
    meterText.textContent = 'DIFFICULTY';

    // color will change with function that calculates difficulty
    difficultyMeter.classList.add('alert', 'alert-success', 'mt-2');
    meterText.classList.add('text-center', 'm-0');

    difficultyMeter.append(meterText);
    
    footerNav.append(runBtn, difficultyMeter, prevBtn, clearBtn);
}

createNewPc = () => {
    mainEl.textContent = '';
    footerNav.textContent = '';
    headerTitle.textContent = 'CREATE NEW PC'

    let form = `
    <form autocomplete="off">
        <div class="mb-3">
            <label for="pcNameInput" class="form-label">PC Name:</label>
            <input type=text class="form-control" id="pcNameInput" placeholder="Type a name...">
        </div>
        <div class="mb-3">
            <label for="pcClassInput" class="form-label">PC Class:</label>
            <select class="form-select" id="pcClassInput" aria-label="Possible classes">
                <option selected>Choose a class</option>
                <option value="barbarian">Barbarian</option>
                <option value="bard">Bard</option>
                <option value="cleric">Cleric</option>
                <option value="druid">Druid</option>
                <option value="fighter">Fighter</option>
                <option value="monk">Monk</option>
                <option value="paladin">Paladin</option>
                <option value="ranger">Ranger</option>
                <option value="rogue">Rogue</option>
                <option value="sorcerer">Sorcerer</option>
                <option value="warlock">Warlock</option>
                <option value="wizard">Wizard</option>
                <option value="artificer">Artificer</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div class="mb-3">
            <label for"pcLevelInput" class"form-label">PC Level:</label>
            <select class="form-select" id="pcLevelInput" aria-label="PC Level">
                <option selected>Choose a level</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
            </select>
        </div>
    </form>
    `;

    mainEl.innerHTML = form;

    let addPcBtn = document.createElement('button');
    addPcBtn.textContent = 'Add PC';
    addPcBtn.classList.add('btn', 'btn-success', 'btn-lg', 'mb-1', 'col-12');
    addPcBtn.addEventListener('click', function() {
        let pcName = document.querySelector('#pcNameInput').value;
        let pcClass = document.querySelector('#pcClassInput').value;
        let pcLevel = document.querySelector('#pcLevelInput').value;
        
        const player = new Pc(pcName, pcClass, pcLevel);
        savedPc.push(player);

        renderCreateEncounter();
    })

    footerNav.append(addPcBtn)
}

// * EVENT LISTENERS
createEncounterBtn.addEventListener('click', renderCreateEncounter);

homeBtn.addEventListener('click', function() {location.reload()});