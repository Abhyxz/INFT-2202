
import animalService from '../services/animalService.js';

function listBuilder(app) {
    const element = document.createElement('div');
    const { recordPage } = app;

    const render = async () => {
        try {
            const { records, pagination } = await animalService.getAnimalPage(recordPage);
            
            element.innerHTML = `
                <h2>Animal List</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Breed</th>
                                <th>Legs</th>
                                <th>Eyes</th>
                                <th>Sound</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${records
                                .filter(animal => animal && animal.name) // Filter out undefined or invalid entries
                                .map(animal => `
                                    <tr>
                                        <td>${animal.name || ''}</td>
                                        <td>${animal.breed || ''}</td>
                                        <td>${animal.legs || ''}</td>
                                        <td>${animal.eyes || ''}</td>
                                        <td>${animal.sound || ''}</td>
                                        <td>
                                            <button class="btn btn-sm btn-primary edit-btn" 
                                                    data-name="${animal.name}">
                                                <i class="fa fa-edit"></i> Edit
                                            </button>
                                            <button class="btn btn-sm btn-danger delete-btn" 
                                                    data-name="${animal.name}">
                                                <i class="fa fa-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="pagination">
                    <button class="btn btn-secondary" ${pagination.page <= 1 ? 'disabled' : ''} id="prevPage">Previous</button>
                    <span class="mx-3">Page ${pagination.page} of ${pagination.pages}</span>
                    <button class="btn btn-secondary" ${pagination.page >= pagination.pages ? 'disabled' : ''} id="nextPage">Next</button>
                </div>
            `;

            // Add event listeners for delete buttons
            element.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const name = e.target.closest('[data-name]')?.dataset.name;
                    if (!name) {
                        console.error('Cannot delete: animal name is missing');
                        return;
                    }

                    if (confirm(`Are you sure you want to delete ${name}?`)) {
                        try {
                            await animalService.deleteAnimal(name);
                            render(); // Refresh the list
                        } catch (error) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'alert alert-danger mt-3';
                            errorDiv.textContent = error.message;
                            element.insertBefore(errorDiv, element.firstChild);
                            
                            setTimeout(() => errorDiv.remove(), 3000);
                        }
                    }
                });
            });

            // Add event listeners for edit buttons
            element.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const name = e.target.closest('[data-name]').dataset.name;
                    // Use history.pushState for client-side navigation
                    window.history.pushState({}, '', `/animal?name=${name}`);
                    // Trigger the router
                    window.dispatchEvent(new PopStateEvent('popstate'));
                });
            });

            element.querySelector('#prevPage')?.addEventListener('click', () => {
                recordPage.page--;
                render();
            });

            element.querySelector('#nextPage')?.addEventListener('click', () => {
                recordPage.page++;
                render();
            });

        } catch (error) {
            element.innerHTML = `<div class="alert alert-danger">Error loading animals: ${error.message}</div>`;
        }
    };

    render();

    return {
        element
    };
}

export default listBuilder;
