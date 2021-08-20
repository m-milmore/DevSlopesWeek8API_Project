// imports = { moviesContainer, myFavsContainer };

const toggleTab = ".toggle-tab";
const switcherBtn = ".switcher-btn";
const open = "open";
const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);
const toggleSort = document.querySelector(toggleTab);
const switcher = document.querySelectorAll(switcherBtn);

// Toggle function to sort the collection and the favorites list
toggleSort.addEventListener("click", function() {
    const tab = this.parentElement.parentElement;
    if (!tab.className.includes(open)) {
        tab.classList.add(open);
    } else {
        tab.classList.remove(open);
    }
});

function sortItems(sortType, container) {
    if (container.childNodes.length > 0) {
        const itemsArr = [];
        const order = sortType % 2 === 0 ? -1 : 1;
        const revOrder = order * -1;

        for (const node of container.childNodes) {
            itemsArr.push(node);
        }

        itemsArr.sort((a, b) => {
            const titleA = a.childNodes[0].childNodes[1].textContent;
            const titleB = b.childNodes[0].childNodes[1].textContent;
            // return titleA > titleB ? 1 : -1; => alphabetical
            return titleA > titleB ? order : revOrder;
        });

        for (const i of itemsArr) {
            container.appendChild(i);
        }
    }
}

function setSort(sortType) {
    if (sortType < 2) {
        alert("No list to sort.");
    } else {
        sortItems(sortType, myFavsContainer);
        sortItems(sortType, moviesContainer);
    }
}

function chooseSort(elm) {
    const booleanBitArray = [];
    const hasMovies = moviesContainer.childNodes.length > 0;
    booleanBitArray.push(hasMovies);
    const hasFavs = myFavsContainer.childNodes.length > 0;
    booleanBitArray.push(hasFavs);
    const sortAlpha = elm.innerText === "(A-Z)";
    booleanBitArray.push(sortAlpha);
    console.log(booleanBitArray);
    const bitToInt = booleanBitArray.reduce((res, x) => (res << 1) | x);
    switch (bitToInt) {
        case 0:
            console.log("no mov, no fav, rev");
            break;
        case 1:
            console.log("no mov, no fav, alp");
            break;
        case 2:
            console.log("no mov, fav, rev");
            break;
        case 3:
            console.log("no mov, fav, alp");
            break;
        case 4:
            console.log("mov, no fav, rev");
            break;
        case 5:
            console.log("mov, no fav, alp");
            break;
        case 6:
            console.log("mov, fav, rev");
            break;
        case 7:
            console.log("mov, fav, alp");
            break;
        default:
            console.log(`${bitToInt} not in the range (between 0 and 7).`);
    }
    setSort(bitToInt);
}

const setActive = (elm, selector) => {
    if (document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    }
    elm.classList.add(active);
    chooseSort(elm);
};

for (const elm of switcher) {
    elm.addEventListener("click", function() {
        setActive(elm, switcherBtn);
    });
}

// Full Site Modal "open buttons"
for (const elm of openModal) {
    elm.addEventListener("click", function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    });
}

// Full Site Modal "close button"
for (const elm of closeModal) {
    elm.addEventListener("click", function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
}