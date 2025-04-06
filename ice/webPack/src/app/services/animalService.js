const animalService = {
    async getAnimalPage({ page = 1, perPage = 5 }) {
        const url = new URL('https://inft2202-server.onrender.com/api/animals');
        url.searchParams.set('page', page);
        url.searchParams.set('perPage', perPage);
        
        const headers = new Headers({
            'Content-Type': 'application/json',
            'user': '100925210'  // Make sure to use your student ID
        });

        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error('Failed to fetch animals');
        }
        const data = await response.json();
        
        return {
            records: data.records || data.animals || [],
            pagination: {
                page: Number(page),
                perPage: Number(perPage),
                pages: data.pagination?.pages || Math.ceil((data.records || data.animals || []).length / perPage)
            }
        };
    },

    async saveAnimal(animalData) {
        const url = 'https://inft2202-server.onrender.com/api/animals';
        const headers = {
            'Content-Type': 'application/json',
            'user': '100925210'
        };

        // Make sure we're sending an array with a single animal object
        const animalPayload = [{
            name: animalData.name,
            breed: animalData.breed,
            legs: Number(animalData.legs),
            eyes: Number(animalData.eyes),
            sound: animalData.sound
        }];

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(animalPayload)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Failed to save animal');
        }

        return result;
    },

    async updateAnimal(animalData) {
        const url = 'https://inft2202-server.onrender.com/api/animals';
        const headers = {
            'Content-Type': 'application/json',
            'user': '100925210'  // Make sure this matches your student ID
        };

        const animalPayload = {
            name: animalData.name,
            breed: animalData.breed,
            legs: Number(animalData.legs),
            eyes: Number(animalData.eyes),
            sound: animalData.sound
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(animalPayload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update animal');
        }
        return response.json();
    },

    async findAnimal(name) {
        const url = `https://inft2202-server.onrender.com/api/animals/${name}`;
        const headers = {
            'Content-Type': 'application/json',
            'user': '100925210'
        };

        const response = await fetch(url, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            throw new Error('Failed to fetch animal');
        }

        const data = await response.json();
        return data;
    },

    async deleteAnimal(name) {
        if (!name) {
            throw new Error('Cannot delete: animal name is undefined');
        }

        const url = `https://inft2202-server.onrender.com/api/animals/${encodeURIComponent(name)}`;
        const headers = {
            'Content-Type': 'application/json',
            'user': '100925210'
        };

        const response = await fetch(url, { 
            method: 'DELETE',
            headers 
        });
            
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete animal');
        }

        return await response.json();
    }
};

export default animalService;










