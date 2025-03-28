// Update footer
const footer = document.querySelector('footer span');
const currentYear = new Date().getFullYear();
footer.textContent = `Abhinav - ${currentYear}`;

// Get DOM elements
const genreSelector = document.getElementById('genre-selector');
const ratingSelector = document.getElementById('rating-selector');
const table = document.querySelector('table');
const alertDiv = document.querySelector('.alert');

// Add event listeners
genreSelector.addEventListener('change', () => {
    fetchMovies(genreSelector.value, ratingSelector.value);
});

ratingSelector.addEventListener('change', () => {
    fetchMovies(genreSelector.value, ratingSelector.value);
});

async function fetchMovies(genre = null, rating = null) {
    try {
        const params = new URLSearchParams();
        if (genre) params.append('genre', genre);
        if (rating) params.append('rating', rating);

        const url = new URL('/api/movies', window.location.origin);
        url.search = params.toString();

        const headers = new Headers({
            'Accept': 'application/json'
        });

        const request = new Request(url, {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch movies');
        }

        const movies = await response.json();

        if (movies.length === 0) {
            table.classList.add('d-none');
            alertDiv.classList.remove('d-none');
        } else {
            table.classList.remove('d-none');
            alertDiv.classList.add('d-none');
            insertMoviesIntoTable(table, movies);
        }
    } catch (error) {
        table.classList.add('d-none');
        alertDiv.classList.remove('d-none');
        alertDiv.textContent = error.message;
    }
}

function insertMoviesIntoTable(table, movies) {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    movies.forEach(movie => {
        const row = tbody.insertRow();
        
        // Set row color based on rating
        if (movie.rating <= 2) {
            row.className = 'table-danger';
        } else if (movie.rating <= 5) {
            row.className = 'table-warning';
        } else if (movie.rating <= 8) {
            row.className = 'table-primary';
        } else {
            row.className = 'table-success';
        }

        // Add cells
        row.insertCell().textContent = movie.title;
        row.insertCell().textContent = movie.genre;
        row.insertCell().textContent = new Date(movie.release_date * 1000).toLocaleDateString();
        row.insertCell().textContent = movie.director;
        row.insertCell().textContent = movie.rating;
    });
}

// Initial load
        // if this movie is rated higher than eight, make this row green
