// app.js

// Animal service mock using localStorage
const animalService = {
    async saveAnimal(animal) {
      let existing = JSON.parse(localStorage.getItem("animals") || "[]");
      if (existing.find(a => a.name === animal.name)) {
        throw new Error("Animal exists");
      }
      existing.push(animal);
      localStorage.setItem("animals", JSON.stringify(existing));
    },
    getAllAnimals() {
      return JSON.parse(localStorage.getItem("animals") || "[]");
    }
  };
  
  // Routes definition
  const routes = {
    '/': `
      <h1>Welcome Home</h1>
      <p>This is the homepage.</p>
    `,
    '/animal': `
      <h1>Add Animal</h1>
      <form id="animal-form">
        <div class="form-group">
          <label for="name">Animal Name</label>
          <input type="text" class="form-control" name="name" required>
          <div class="text-danger d-none"></div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    `,
    '/list': `
      <h1>Animal List</h1>
      <ul id="animal-list" class="list-group mt-3"></ul>
    `,
    '/contact': `
      <h1>Contact Us</h1>
      <form id="contact-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" required>
        </div>
        <button class="btn btn-success mt-2">Send</button>
      </form>
    `,
    '/about': `
      <h1>About Us</h1>
      <p>This app was created by Abhinav for INFT 2202 Assignment 3.</p>
    `
  };
  
  // SPA route loader
  function loadRoute() {
    const path = location.hash.replace('#', '') || '/';
    const main = document.querySelector('main');
    main.innerHTML = `<div id="spa-content">${routes[path] || '<h1>404 - Page not found</h1>'}</div>`;
  
    if (path === '/animal') {
      document.getElementById('animal-form').addEventListener('submit', submitAnimalForm);
    }
  
    if (path === '/list') {
      const animals = animalService.getAllAnimals();
      const listEl = document.getElementById('animal-list');
      listEl.innerHTML = animals.map(a => `<li class="list-group-item">${a.name}</li>`).join('');
    }
  }
  
  // Form validation
  function validateAnimalForm(form) {
    let valid = true;
    const name = form.name.value.trim();
    const errorEl = form.name.nextElementSibling;
  
    if (!name) {
      errorEl.classList.remove('d-none');
      errorEl.textContent = "You must name this animal!";
      valid = false;
    } else {
      errorEl.classList.add('d-none');
    }
    return valid;
  }
  
  // Handle form submit
  async function submitAnimalForm(event) {
    event.preventDefault();
    const form = event.target;
    if (validateAnimalForm(form)) {
      const formData = new FormData(form);
      const animal = {};
      formData.forEach((val, key) => animal[key] = val);
  
      try {
        await animalService.saveAnimal(animal);
        form.reset();
        window.location.hash = '#/list';
      } catch (err) {
        const errorEl = form.name.nextElementSibling;
        errorEl.classList.remove('d-none');
        errorEl.textContent = "This animal already exists!";
      }
    }
  }
  
  // Initial setup
  window.addEventListener('hashchange', loadRoute);
  window.addEventListener('DOMContentLoaded', () => {
    loadRoute();
    document.getElementById('copyrightYear').textContent = new Date().getFullYear();
  });
  