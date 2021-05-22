const list = document.getElementById('list');

function addItem(item) {
    // Get the input
    const input = item ? item : document.getElementById('input').value;
    // Generate the element to display
    const element = document.createElement('li');
    element.innerText = input;
    // Have the element be removed/completed when its clicked
    element.onclick = function () { 
        element.remove();
        // Prevent item from showing up after reloading the page
        removeItemFromSave(input);
    }
    list.appendChild(element);
    // Prevent slight recursion
    if (!item) {
        save(input);
    }
    document.getElementById('input').value = '';
}

function removeItemFromSave(input) {
    let save = window.localStorage.getItem('mytodolist');
    const updatedSave = save.replace(input, '');
    window.localStorage.setItem('mytodolist', updatedSave);
}

function save(input) {
    let currentSave = window.localStorage.getItem('mytodolist');
    if (currentSave) {
        // Concat our new item with the rest of them
        currentSave += `,${input}`;
        window.localStorage.setItem('mytodolist', currentSave);
    } else {
        window.localStorage.setItem('mytodolist', input);
    }
}

function load() {
    const save = window.localStorage.getItem('mytodolist');
    if (save) {
        // If there is saved data, then load each item onto the page
        const items = save.split(',');
        for (let i = 0; i < items.length; i++) {
            if (items[i]) {
                addItem(items[i]);
            }
        }
    }
}

window.onload = load;