// Tell us what page we're on
console.log('we are on the add page');

/*
 *  Name: Abhinav Jayakumar
 *  Date: 2025-01-24
 *  Description: Handles adding and editing animal details
 */

import animalService from "./animal.service.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');

    if (animalId) {
        await setupEditForm(animalId);
    }

    const animalForm = document.getElementById('animal-form');
    animalForm.addEventListener('submit', submitAnimalForm);
});

async function setupEditForm(id) {
    try {
        const heading = document.querySelector('h1');
        heading.textContent = "Edit Animal";

        const animal = await animalService.findAnimal(id);
        const animalForm = document.getElementById('animal-form');

        for (const key in animal) {
            if (animal.hasOwnProperty(key)) {
                const input = animalForm.elements[key];
                if (input) {
                    input.value = animal[key];
                    if (key === 'name') {
                        input.disabled = true; // Disable name field in edit mode
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error setting up edit form:", error);
        alert("Animal not found!");
        window.location.href = "search.html"; // Redirect if the animal is not found
    }
}

async function submitAnimalForm(event) {
    event.preventDefault();
    const animalForm = event.target;
    const valid = validateAnimalForm(animalForm);

    if (valid) {
        const formData = new FormData(animalForm);
        const animalObject = {};

        formData.forEach((value, key) => {
            animalObject[key] = key === 'eyes' || key === 'legs' ? Number(value) : value;
        });

        const animalId = animalForm.elements['id'].value || null;

        try {
            if (animalId) {
                await animalService.updateAnimal(animalObject);
            } else {
                await animalService.saveAnimal(animalObject);
            }
            window.location.href = "search.html"; // Redirect after saving
        } catch (error) {
            console.error("Error saving animal:", error);
            alert("Failed to save the animal. Please try again.");
        }
    }
}

function validateAnimalForm(form) {
    let valid = true;
    const name = form.name.value.trim();
    const nameError = form.querySelector("#name-error");

    if (!name) {
        nameError.classList.remove('d-none');
        nameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        nameError.classList.add('d-none');
    }

    return valid;
}
