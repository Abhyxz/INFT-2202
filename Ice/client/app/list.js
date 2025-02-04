import animalService from "./animal.service.mock.js";

console.log('we are on the list page');

// Parse URL parameters
const params = new URL(document.location).searchParams;

// Add records for pagination testing
let recCount = params.get("records");
if (recCount !== null) {
    let index = 0;
    while (recCount-- > 0) {
        animalService.saveAnimal({
            "name": `name ${index++}`,
            "breed": "Grizzly Bear",
            "legs": 4,
            "eyes": 2,
            "sound": "Moo"
        });
    }
}

/* DOM Elements */
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('animal-list');
const paginationContainer = document.getElementById('pagination');

// Get paginated animal records
let recordPage = {
    page: Number(params.get('page')) || 1,
    perPage: Number(params.get('perPage')) || 7
};

const { records, pagination } = animalService.getAnimalPage(recordPage);

// Handle Empty Table Case
if (!records.length) {
    eleEmpty.classList.remove('d-none');
    eleTable.classList.add('d-none');
} else {
    eleEmpty.classList.add('d-none');
    eleTable.classList.remove('d-none');
    drawAnimalTable(records);
    drawPagination(pagination);
}

/* Draws Pagination */
function drawPagination({ page = 1, perPage = 5, pages = 1 }) {
    paginationContainer.innerHTML = ""; // Clear existing pagination
    if (pages <= 1) return; // No need to show pagination if only 1 page

    const ul = document.createElement("ul");
    ul.classList.add('pagination');

    ul.insertAdjacentHTML('beforeend', addPage(page - 1, 'Previous', page === 1 ? 'disabled' : ''));
    for (let i = 1; i <= pages; i++) {
        ul.insertAdjacentHTML('beforeend', addPage(i, i, i === page ? 'active' : ''));
    }
    ul.insertAdjacentHTML('beforeend', addPage(page + 1, 'Next', page === pages ? 'disabled' : ''));

    paginationContainer.append(ul);

    function addPage(number, text, style) {
        return `<li class="page-item ${style}">
            <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
        </li>`;
    }
}

/* Draws the Animal Table */
function drawAnimalTable(animals) {
    eleTable.innerHTML = ""; // Clear previous table rows

    for (let animal of animals) {
        const row = eleTable.insertRow();

        row.insertCell().textContent = animal.name;
        row.insertCell().textContent = animal.breed;
        row.insertCell().textContent = animal.legs;
        row.insertCell().textContent = animal.eyes;
        row.insertCell().textContent = animal.sound;

        // Create button cell
        const eleBtnCell = row.insertCell();
        eleBtnCell.classList.add('d-flex', 'justify-content-center');

        // Delete Button
        const eleBtnDelete = document.createElement('button');
        eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
        eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
        eleBtnDelete.addEventListener('click', () => onDeleteButtonClick(animal));
        eleBtnCell.append(eleBtnDelete);

        // Edit Button
        const eleBtnEdit = document.createElement('a');
        eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
        eleBtnEdit.innerHTML = `<i class="fa fa-user"></i>`;
        eleBtnEdit.href = `./animal.html?name=${animal.name}`;
        eleBtnCell.append(eleBtnEdit);
    }
}

/* Deletes Animal and Refreshes Table */
function onDeleteButtonClick(animal) {
    if (confirm(`Are you sure you want to delete ${animal.name}?`)) {
        animalService.deleteAnimal(animal);
        location.reload(); // Refresh the table
    }
}
