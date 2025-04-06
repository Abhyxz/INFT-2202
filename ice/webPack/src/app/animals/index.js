import animalService from '../services/animalService.js';

function animalBuilder(app) {
    const element = document.createElement('div');

    const render = async () => {
        try {
            let animal = { name: '', breed: '', legs: 0, eyes: 0, sound: '' };
            
            if (app.name) {
                const result = await animalService.findAnimal(app.name);
                if (result && result.length > 0) {
                    animal = result[0];
                }
            }

            element.innerHTML = `
                <h2>${app.name ? 'Edit' : 'Add'} Animal</h2>
                <form id="animalForm" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name" 
                               value="${animal.name}" ${app.name ? 'readonly' : ''} required>
                        <div class="invalid-feedback">Please provide a name.</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="breed" class="form-label">Breed</label>
                        <input type="text" class="form-control" id="breed" name="breed" 
                               value="${animal.breed}" required>
                        <div class="invalid-feedback">Please provide a breed.</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="legs" class="form-label">Number of Legs</label>
                        <input type="number" class="form-control" id="legs" name="legs" 
                               value="${animal.legs}" required min="0">
                        <div class="invalid-feedback">Please provide number of legs.</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="eyes" class="form-label">Number of Eyes</label>
                        <input type="number" class="form-control" id="eyes" name="eyes" 
                               value="${animal.eyes}" required min="0">
                        <div class="invalid-feedback">Please provide number of eyes.</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="sound" class="form-label">Sound</label>
                        <input type="text" class="form-control" id="sound" name="sound" 
                               value="${animal.sound}" required>
                        <div class="invalid-feedback">Please provide a sound.</div>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        ${app.name ? 'Update' : 'Create'} Animal
                    </button>
                </form>
            `;

            element.querySelector('#animalForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    const formData = new FormData(e.target);
                    const animalData = {
                        name: formData.get('name').trim(),
                        breed: formData.get('breed').trim(),
                        legs: parseInt(formData.get('legs'), 10),
                        eyes: parseInt(formData.get('eyes'), 10),
                        sound: formData.get('sound').trim()
                    };
                    
                    if (app.name) {
                        await animalService.updateAnimal(animalData);
                    } else {
                        await animalService.saveAnimal(animalData);
                    }

                    // Navigate back to list
                    window.history.pushState({}, '', '/');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                } catch (error) {
                    console.error('Error:', error);
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'alert alert-danger mt-3';
                    errorDiv.textContent = error.message || 'An error occurred while saving the animal';
                    element.querySelector('form').insertAdjacentElement('beforebegin', errorDiv);
                }
            });
        } catch (error) {
            element.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
        }
    };

    render();
    return { element };
}

export default animalBuilder;
