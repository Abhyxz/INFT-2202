const animalService = {
    async getAnimalPage({ page = 1, perPage = 5 }) {
        // Implement your API call here
        // Return format should be: { records: [], pagination: { page, perPage, pages } }
        return {
            records: [],
            pagination: {
                page,
                perPage,
                pages: 1
            }
        };
    },

    async deleteAnimal(name) {
        // Implement delete functionality
    }
};

export default animalService;
