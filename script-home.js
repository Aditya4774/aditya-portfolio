const movies = [
    {
        id: 1,
        title: "Dhurandhar",
        genre: "Action/Thriller/Adventure",
        duration: "3h 34m",
        showtimes: ["10:00 AM", "2:00 PM", "6:30 PM"],
        director: "Aditya Dhar",
        price: 180,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1Xqn_Tw-5j4lg_Kiw9tyke4FBiHZFZqNpvl7kfY9gg&s=10"
    },
    {
        id: 2,
        title: "KGF Chapter 3",
        genre: "Drama/Action/Thriller",
        duration: "3h 0m",
        showtimes: ["11:30 AM", "2:00 PM", "8:15 PM"],
        director: "Prashant Neel",
        price: 160,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvbESvyW7Nwg8lZnXLG-zZzIp_J9Uj-pSDBhyD4jVh4A&s=10"
    },
    {
        id: 3,
        title: "Avangers-infinity war",
        genre: "Action",
        duration: "3h 12m",
        showtimes: ["12:00 PM", "4:30 PM", "8:15 PM"],
        director: "Russo brothers, Anthony and Joe Russo.",
        price: 130,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9lAajzqSnHCu9hfc59hNr74tAwGDE9B42p5gfY0q5WKxzwL1fHDCNuwWo&s=10"
    },
    {
        id: 4,
        title: "Spider-Man",
        genre: "Animation",
        duration: "2h 20m",
        showtimes: ["10:30 AM", "1:15 PM", "4:45 PM", "9:30 PM"],
        director: "Joaquim Dos Santos",
        price: 160,
        image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Spider-Man",
        genre: "Animation",
        duration: "2h 20m",
        showtimes: ["10:30 AM", "1:15 PM", "4:45 PM", "9:30 PM"],
        director: "Joaquim Dos Santos",
        price: 160,
        image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=600&q=80"
    }
];

const movieGrid = document.getElementById('movie-grid');
const searchInput = document.getElementById('movie-search');

function renderMovies(movieData) {
    if (movieData.length === 0) {
        movieGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); width: 100%; grid-column: 1 / -1;">No movies found matching your search.</p>';
        return;
    }

    movieGrid.innerHTML = movieData.map(movie => `
        <div class="movie-poster-card" style="background-image: url('${movie.image}')">
            <div class="movie-overlay">
                <h3 class="movie-overlay-title">${movie.title}</h3>
                <p class="movie-overlay-director">DIR. ${movie.director}</p>
                
                <div class="movie-tags">
                    <span class="tag">${movie.genre}</span>
                    <span class="tag">${movie.duration}</span>
                </div>
                
                <div style="margin-top: 10px;">
                    <select id="showtime-${movie.id}" class="showtime-dropdown">
                        ${movie.showtimes.map(t => `<option value="${t}">${t}</option>`).join('')}
                    </select>
                </div>
                
                <div class="movie-overlay-footer">
                    <div class="starting-price">
                        <span>Starting At</span>
                        <span class="val">₹${movie.price}</span>
                    </div>
                    <button class="btn" onclick="bookMovie('${movie.title}', ${movie.price}, ${movie.id})">Book</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Logic
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.director.toLowerCase().includes(searchTerm)
    );
    renderMovies(filteredMovies);
});

function bookMovie(title, basePrice, id) {
    const timeSelect = document.getElementById(`showtime-${id}`);
    const selectedTime = timeSelect ? timeSelect.value : null;

    localStorage.setItem('selectedMovieTitle', title);
    localStorage.setItem('selectedMoviePrice', basePrice);
    if (selectedTime) {
        localStorage.setItem('selectedMovieTime', selectedTime);
    }
    localStorage.removeItem('selectedSeats');
    window.location.href = 'seats.html';
}

// Initial render
renderMovies(movies);
