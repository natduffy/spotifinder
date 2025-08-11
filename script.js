// Spotifinder Application - Music Genre Discovery
class GenreMixer {
    constructor() {
        // Genres are loaded from external genres_data.js file
        this.genres = GENRES;
        
        this.genresPerPage = 12;
        this.displayedGenres = [];
        this.init();
    }

    init() {
        this.updateTotalCount();
        this.setupEventListeners();
        this.displayRandomGenres();
    }

    updateTotalCount() {
        const totalElement = document.getElementById('totalGenres');
        if (totalElement) {
            totalElement.textContent = this.genres.length;
        }
    }

    setupEventListeners() {
        const remixBtn = document.getElementById('remixBtn');
        const mobileRemixBtn = document.getElementById('mobileRemixBtn');
        
        if (remixBtn) {
            remixBtn.addEventListener('click', () => this.displayRandomGenres());
        }
        
        if (mobileRemixBtn) {
            mobileRemixBtn.addEventListener('click', () => this.displayRandomGenres());
        }
    }

    displayRandomGenres() {
        this.showLoading(true);
        
        // Clear current display
        const grid = document.getElementById('genreGrid');
        if (grid) {
            grid.innerHTML = '';
        }

        // Get random genres
        this.displayedGenres = this.getRandomGenres(this.genresPerPage);
        
        // Update count
        const countElement = document.getElementById('genreCount');
        if (countElement) {
            countElement.textContent = this.displayedGenres.length;
        }

        // Create and display genre cards
        setTimeout(() => {
            this.createGenreCards();
            this.showLoading(false);
        }, 500);
    }

    getRandomGenres(count) {
        // Fisher-Yates shuffle algorithm for true randomization
        const shuffled = [...this.genres];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    createGenreCards() {
        const grid = document.getElementById('genreGrid');
        if (!grid) return;

        this.displayedGenres.forEach(genre => {
            const card = this.createGenreCard(genre);
            grid.appendChild(card);
        });
    }

    createGenreCard(genre) {
        const card = document.createElement('div');
        card.className = 'genre-card';
        
        const description = this.generateGenreDescription(genre);
        
        card.innerHTML = `
            <div class="genre-name">${genre}</div>
            <div class="genre-description">${description}</div>
            <div class="genre-action">
                <i class="fab fa-spotify"></i>
            </div>
        `;

        card.addEventListener('click', () => this.openSpotifySearch(genre));
        
        return card;
    }

    generateGenreDescription(genre) {
        // Use the comprehensive descriptions from the external file
        if (typeof GENRE_DESCRIPTIONS !== 'undefined' && GENRE_DESCRIPTIONS[genre]) {
            return GENRE_DESCRIPTIONS[genre];
        }
        
        // Fallback generic description if not found
        return 'A unique musical style with its own distinctive characteristics and cultural influences.';
    }

    openSpotifySearch(genre) {
        const searchTerm = encodeURIComponent(genre);
        const spotifyUrl = `https://open.spotify.com/search/${searchTerm}`;
        window.open(spotifyUrl, '_blank');
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        const grid = document.getElementById('genreGrid');
        
        if (loading && grid) {
            if (show) {
                loading.classList.add('show');
                grid.style.display = 'none';
            } else {
                loading.classList.remove('show');
                grid.style.display = 'grid';
            }
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GenreMixer();
}); 