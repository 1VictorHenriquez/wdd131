// grab references to DOM nodes
const input = document.querySelector('#favchap');
const button = document.querySelector('#add-btn');
const list = document.querySelector('#chapters');

// helper to create a list item with delete button
function createEntry(value) {
    const li = document.createElement('li');
    // text of the chapter
    li.textContent = value;

    const deleteButton = document.createElement('button');
    // accessible label for screen readers
    deleteButton.setAttribute('aria-label', `Remove ${value}`);
    deleteButton.textContent = '❌';

    // when clicked remove the li
    deleteButton.addEventListener('click', () => {
        li.remove();
    });

    li.append(deleteButton);
    return li;
};

// add new chapter when the Add button is clicked
button.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return; // nothing entered

    const entry = createEntry(value);
    list.append(entry);
    input.value = '';
    input.focus();
});

// NOTE: more event handling and persistence will be added in future activities.
