import express from 'express';
import movies from './data/movies.js';

const port = 3022;
const app = express();

// Configure middleware
app.use(express.json());
app.use(express.static('src/client'));
app.use(express.static('node_modules'));

// Create router
const router = express.Router();

// GET /api/movies route
router.get('/api/movies', (req, res) => {
    let filteredMovies = [...movies];
    const { rating, genre } = req.query;

    // Handle rating filter
    if (rating) {
        const ratingNum = parseFloat(rating);
        if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
            return res.status(400).json({ error: 'Rating must be between 1 and 10' });
        }
        filteredMovies = filteredMovies.filter(movie => movie.rating >= ratingNum);
    }

    // Handle genre filter
    if (genre) {
        filteredMovies = filteredMovies.filter(
            movie => movie.genre.toLowerCase() === genre.toLowerCase()
        );
    }

    // Sort by rating (highest to lowest)
    filteredMovies.sort((a, b) => b.rating - a.rating);

    res.json(filteredMovies);
});

// Use router
app.use('/', router);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

