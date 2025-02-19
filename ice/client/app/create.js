// tell us what page we're on
console.log('we are on the add page');

// assign a handler to the submit event
document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

// create a handler to deal with the submit event
async function submitAnimalForm ( event ) {
    // prevent the default action from happening
    event.preventDefault();
    // get a reference to the form (from the event)
    const animalForm = event.target;  
    // validate the form
    const valid = validateAnimalForm(animalForm);
    // do stuff if the form is valid
    if (valid) {
        console.log('were good');
        
        const formData = new FormData(animalForm);
        //create a javascript object to hold the form data
        const animalObject = {};
        formData.forEach((value, key) => {
            //by default, a value from form is string
            //we need to convert them accordingly
            if(key === 'eyes' || key ==='legs'){
                animalObject[key] = Number(value);
            }
            else{
                animalObject[key] = value;
            }
        });

        const eleNameError = animalForm.name.nextElementSibling
        try {
            await animalService.saveAnimal(animalObject)
            eleNameError.classList.add('d-none');
            animalForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }        
    // do nothing if it's not
    } else {
        console.log('were not good');
    }
}

// validate the animal form
function validateAnimalForm(form) {
    console.log('validating');
    let valid = true;

    // Validate Name
    const name = form.name.value.trim();
    const eleNameError = form.name.nextElementSibling;
    if (name === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    // Validate Breed
    const breed = form.breed.value.trim();
    const eleBreedError = form.breed.nextElementSibling;
    if (breed === "") {
        eleBreedError.classList.remove('d-none');
        eleBreedError.textContent = "You must specify the breed!";
        valid = false;
    } else {
        eleBreedError.classList.add('d-none');
    }

    // Validate Number of Eyes
    const eyes = form.eyes.value.trim();
    const eleEyesError = form.eyes.nextElementSibling;
    if (eyes === "" || isNaN(eyes) || Number(eyes) < 0) {
        eleEyesError.classList.remove('d-none');
        eleEyesError.textContent = "Please enter a valid number of eyes (0 or greater)!";
        valid = false;
    } else {
        eleEyesError.classList.add('d-none');
    }

    // Validate Number of Legs
    const legs = form.legs.value.trim();
    const eleLegsError = form.legs.nextElementSibling;
    if (legs === "" || isNaN(legs) || Number(legs) < 0) {
        eleLegsError.classList.remove('d-none');
        eleLegsError.textContent = "Please enter a valid number of legs (0 or greater)!";
        valid = false;
    } else {
        eleLegsError.classList.add('d-none');
    }

    // Validate Sound
    const sound = form.sound.value.trim();
    const eleSoundError = form.sound.nextElementSibling;
    if (sound === "") {
        eleSoundError.classList.remove('d-none');
        eleSoundError.textContent = "You must specify the sound this animal makes!";
        valid = false;
    } else {
        eleSoundError.classList.add('d-none');
    }

    // Return if the form is valid or not
    return valid;
}