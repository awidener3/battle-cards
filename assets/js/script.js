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
let storedPc = JSON.parse(localStorage.getItem('playerCharacter'));

if (storedPc == null) {
    storedPc = [];
}

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

    // pushes to summary page before adding any elements below
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

    let selectionDiv = document.createElement('div');
    selectionDiv.classList.add('container', 'mt-4')
    selectionDiv.setAttribute('id', 'selection-div');

    mainEl.appendChild(selectionDiv)

    // uses current pageIndex to dynamically change what is displayed
    switch (pageIndex) {
        case 0: // * pc's
            text.textContent = 'Select your PC\'s:';
            addBtn.textContent = '+ add new PC';
            addBtn.addEventListener('click', createNewPc);

            // rows will dynamically update depending on saved/created/searched pc's/npc's/monsters
            for (let i = 0; i < storedPc.length; i++) {
                createRow(storedPc[i].pcLevel, storedPc[i].pcName, storedPc[i].pcClass, `Init ??`, i);
            }

            break;

        case 1: // * npc's
            text.textContent = 'Select your NPC\'s:';
            addBtn.textContent = '+ add new NPC';

            createRow('??', 'Saved NPC 1', '??');

            break;
            
        case 2: // * monsters
            text.textContent = 'Select your monster\'s';
            addBtn.textContent = '+ add new monster';

            createRow('??', 'MONSTER 1', '??');

            break;

        default:
            console.log('error');
    }

    // handles close button on each row
    let closeBtns = document.querySelectorAll('.close')

    for (let i = 0; i < closeBtns.length; i++) {
        closeBtns[i].addEventListener('click', function() {

            if (confirm('Are you sure you want to delete?')) {
                // remove from page
                this.parentElement.parentElement.remove();
                // remove from local storage
                let index = this.parentElement.parentElement.dataset.index;
                let pcArray = JSON.parse(localStorage.getItem('playerCharacter'));
                pcArray.splice(index, 1);
                localStorage.setItem('playerCharacter', JSON.stringify(pcArray));
            }
        })
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

createRow = (info, title, secondary, initiative, index) => {
    let infoText;

    if (pageIndex == 0) {
        infoText = 'Lvl';
    } else if (pageIndex == 1) {
        infoText = 'CR';
    } else {
        infoText = '#';
    }

    let row = 
    `
    <div class="player-level col-2 border bg-secondary d-flex flex-column justify-content-center align-items-center">
        <p class="m-0">${infoText}</p>
        <p class="m-0">${info}</p>
    </div>
    <div class="row-title col-7 border-top border-bottom d-flex align-items-center">
        <div>
        <h5 class="m-0">${title}</h5>
        <p class="m-0">${secondary}</p>
        </div>
        <span class="close">x</span>
    </div>
    <div class="col-2 border bg-secondary">
        <p>${initiative}</p>
    </div>
    `;

    let selectionDiv = document.querySelector('#selection-div')
    let selectionRow = document.createElement('div');
    selectionRow.classList.add('row', 'justify-content-center', 'my-3');
    selectionRow.dataset.index = index;
    selectionRow.innerHTML += row;

    // TODO: collect info to add to encounter
    selectionRow.addEventListener('click', function() {
        console.log('click');
        // will collect information from this row and add to encounter
    })

    selectionDiv.append(selectionRow);

    mainEl.append(selectionDiv);
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
    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'save encounter';
    saveBtn.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-1', 'col-5');
    saveBtn.addEventListener('click', function() {
        // save
    })

    let runBtn = document.createElement('button');
    runBtn.textContent = 'run battle >>';
    runBtn.classList.add('btn', 'btn-success', 'btn-lg', 'mb-1', 'col-5');
    runBtn.addEventListener('click', function() {
        // start encounter
    })

    // * difficulty meter
    let difficultyMeter = document.createElement('div');
    let meterText = document.createElement('p');
    meterText.textContent = 'DIFFICULTY';

    // color will change with function that calculates difficulty
    difficultyMeter.classList.add('alert', 'alert-success', 'mt-2');
    meterText.classList.add('text-center', 'm-0');

    difficultyMeter.append(meterText);

    // clear buttons
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
    
    footerNav.append(saveBtn, runBtn, difficultyMeter, prevBtn, clearBtn);
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
                <option value="Barbarian">Barbarian</option>
                <option value="Bard">Bard</option>
                <option value="Cleric">Cleric</option>
                <option value="Druid">Druid</option>
                <option value="Fighter">Fighter</option>
                <option value="Monk">Monk</option>
                <option value="Paladin">Paladin</option>
                <option value="Ranger">Ranger</option>
                <option value="Rogue">Rogue</option>
                <option value="Sorcerer">Sorcerer</option>
                <option value="Warlock">Warlock</option>
                <option value="Wizard">Wizard</option>
                <option value="Artificer">Artificer</option>
                <option value="Other">Other</option>
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

    let backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.classList.add('btn', 'btn-secondary', 'btn-lg', 'mb-2', 'col-12');
    backBtn.addEventListener('click', function() {
        renderCreateEncounter();
    })

    let addPcBtn = document.createElement('button');
    addPcBtn.textContent = 'Add PC';
    addPcBtn.classList.add('btn', 'btn-success', 'btn-lg', 'mb-1', 'col-12');
    addPcBtn.addEventListener('click', function() {
        let pcName = document.querySelector('#pcNameInput').value;
        let pcClass = document.querySelector('#pcClassInput').value;
        let pcLevel = document.querySelector('#pcLevelInput').value;
        
        const player = new Pc(pcName, pcClass, pcLevel);
        storedPc.push(player);
        localStorage.setItem('playerCharacter', JSON.stringify(storedPc))

        renderCreateEncounter();
    })

    footerNav.append(backBtn, addPcBtn)
}

// * EVENT LISTENERS
createEncounterBtn.addEventListener('click', renderCreateEncounter);

homeBtn.addEventListener('click', function() {location.reload()});