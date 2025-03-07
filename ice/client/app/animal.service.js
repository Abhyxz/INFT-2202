// Export a new instance of the AnimalService with the provided host and user
export default new AnimalService({
    host: 'https://inft2202-server.onrender.com/',
    user: '100925038'
});

/*
 *  Constructor for AnimalService
 */
function AnimalService({ host, user }) {
    this.host = host;
    this.headers = new Headers({
        'Content-Type': 'application/json',
        'user': user
    });
}

/*
 *  Find a specific animal by its name
 */
AnimalService.prototype.findAnimal = async function(name) {
    const url = new URL(`/api/animals/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        if (res.ok) {
            return res.json();
        }
        throw new Error('Animal not found');
    } catch (err) {
        console.error(err);
        return false;
    }
};

/*
 *  Get a paginated list of animals (supports pagination with page and perPage)
 */
AnimalService.prototype.getAnimalPage = async function({ page = 1, perPage = 8 }) {
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/api/animals?${params.toString()}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        if (res.ok) {
            return res.json();
        }
        throw new Error('Failed to fetch animal page');
    } catch (err) {
        console.error(err);
        return false;
    }
};

/*
 *  Save a new animal to the server
 */
AnimalService.prototype.saveAnimal = async function(animal) {
    const url = new URL(`/api/animals`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(animal)
    });
    try {
        const res = await fetch(req);
        if (res.ok) {
            return res.json();
        }
        throw new Error('Failed to save animal');
    } catch (err) {
        console.error(err);
        return false;
    }
};

/*
 *  Update an existing animal on the server
 */
AnimalService.prototype.updateAnimal = async function(animal) {
    const url = new URL(`/api/animals`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'PUT',
        body: JSON.stringify(animal)
    });
    try {
        const res = await fetch(req);
        if (res.ok) {
            return res.json();
        }
        throw new Error('Failed to update animal');
    } catch (err) {
        console.error(err);
        return false;
    }
};

/*
 *  Delete an animal from the server
 */
AnimalService.prototype.deleteAnimal = async function(name) {
    const url = new URL(`/api/animals/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'DELETE',
    });
    try {
        const res = await fetch(req);
        if (res.status === 204) {
            return true;
        }
        throw new Error('Failed to delete animal');
    } catch (err) {
        console.error(err);
        return false;
    }
};
