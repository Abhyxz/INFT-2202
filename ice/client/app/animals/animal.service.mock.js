/*
 *  Animal Service Constructor
 */
function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

AnimalService.prototype.getAnimals = function() {
    return JSON.parse(localStorage.getItem('animals')) || [];
};

AnimalService.prototype.getAnimalPage = function({ page = 1, perPage = 5 }) {
    const animals = this.getAnimals();
    const totalRecords = animals.length;
    const pages = Math.ceil(totalRecords / perPage);
    const startIndex = (page - 1) * perPage;
    const records = animals.slice(startIndex, startIndex + perPage);
    return { records, pagination: { page, perPage, pages } };
};

AnimalService.prototype.saveAnimal = function(animal) {
    if (!animal || !animal.name) {
        throw new Error('Invalid animal object!');
    }
    const animals = this.getAnimals();
    if (animals.some(a => a.name === animal.name)) {
        throw new Error('An animal with that name already exists!');
    }
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

AnimalService.prototype.findAnimal = function(animalName) {
    if (!animalName) {
        throw new Error('Invalid animal name!');
    }
    const animals = this.getAnimals();
    const animal = animals.find(a => a.name === animalName);
    if (!animal) {
        throw new Error('That animal does not exist!');
    }
    return animal;
};

AnimalService.prototype.updateAnimal = function(animal) {
    if (!animal || !animal.name) {
        throw new Error('Invalid animal object!');
    }
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name === animal.name);
    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }
    animals[idx] = animal;
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

AnimalService.prototype.deleteAnimal = function(animalName) {
    if (!animalName) {
        throw new Error('Invalid animal name!');
    }
    let animals = this.getAnimals();
    const newAnimals = animals.filter(a => a.name !== animalName);
    if (animals.length === newAnimals.length) {
        throw new Error('That animal does not exist!');
    }
    localStorage.setItem('animals', JSON.stringify(newAnimals));
    return true;
};

export default new AnimalService();
