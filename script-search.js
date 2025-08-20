// Spotifinder Application - Music Genre Discovery with Real-Time Search
class GenreMixer {
    constructor() {
        // Genres are loaded from external genres_data.js file
        this.genres = GENRES;
        this.genreDescriptions = GENRE_DESCRIPTIONS;
        this.genresPerPage = 12;
        this.displayedGenres = [];
        this.searchQuery = '';
        this.searchResults = [];
        this.isSearchMode = false;
        this.searchDebounceTimer = null;
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
        const searchInput = document.getElementById('searchInput');
        const clearSearchBtn = document.getElementById('clearSearch');
        
        if (remixBtn) {
            remixBtn.addEventListener('click', () => this.showRandomGenres());
        }
        
        if (mobileRemixBtn) {
            mobileRemixBtn.addEventListener('click', () => this.showRandomGenres());
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearchInput(e.target.value));
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.clearSearch();
                }
            });
        }

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => this.clearSearch());
        }
    }

    handleSearchInput(query) {
        // Clear previous debounce timer
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
        }

        // Set new debounce timer for 150ms
        this.searchDebounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, 150);
    }

    performSearch(query) {
        const trimmedQuery = query.trim().toLowerCase();
        
        // Prevent duplicate searches with the same query
        if (trimmedQuery === this.searchQuery) {
            return;
        }
        
        this.searchQuery = trimmedQuery;
        
        if (this.searchQuery === '') {
            this.clearSearch();
            return;
        }

        this.isSearchMode = true;
        
        // Track search query
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search_query', {
                event_category: 'search_behavior',
                event_label: this.searchQuery,
                value: this.searchQuery.length,
                custom_parameter_1: 'search_mode'
            });
        }
        
        // Filter genres based on search query
        this.searchResults = this.genres.filter(genre => 
            genre.toLowerCase().includes(this.searchQuery)
        );

        // Update search stats
        this.updateSearchStats();
        
        // Display search results
        this.displaySearchResults();
        
        // Show clear button
        this.showClearButton(true);
        
        // Update button text
        this.updateButtonText();
    }

    updateSearchStats() {
        const statsElement = document.getElementById('searchResultsCount');
        if (statsElement) {
            statsElement.textContent = this.searchResults.length;
        }
    }

    displaySearchResults() {
        this.showLoading(true);
        
        // Clear current display completely
        const grid = document.getElementById('genreGrid');
        if (grid) {
            grid.innerHTML = '';
        }

        // Update count
        const countElement = document.getElementById('genreCount');
        if (countElement) {
            countElement.textContent = Math.min(this.searchResults.length, this.genresPerPage);
        }

        // Create and display genre cards immediately (no delay needed)
        this.createSearchResultCards();
        this.showLoading(false);
    }

    createSearchResultCards() {
        const grid = document.getElementById('genreGrid');
        if (!grid) return;

        // Ensure grid is empty before adding new cards
        if (grid.children.length > 0) {
            grid.innerHTML = '';
        }

        // Show first page of results
        const displayResults = this.searchResults.slice(0, this.genresPerPage);
        
        displayResults.forEach(genre => {
            const card = this.createGenreCard(genre);
            grid.appendChild(card);
        });

        // Add "show more" button if there are more results
        if (this.searchResults.length > this.genresPerPage) {
            this.addShowMoreButton(grid);
        }
    }

    addShowMoreButton(grid) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        showMoreBtn.innerHTML = `
            <i class="fas fa-chevron-down"></i>
            Show More Results (${this.searchResults.length - this.genresPerPage} remaining)
        `;
        
        showMoreBtn.addEventListener('click', () => this.showMoreResults());
        grid.appendChild(showMoreBtn);
    }

    showMoreResults() {
        const grid = document.getElementById('genreGrid');
        if (!grid) return;

        // Remove show more button
        const existingBtn = grid.querySelector('.show-more-btn');
        if (existingBtn) {
            existingBtn.remove();
        }

        // Calculate current display count
        const currentCount = grid.children.length;
        const nextBatch = this.searchResults.slice(currentCount, currentCount + this.genresPerPage);

        nextBatch.forEach(genre => {
            const card = this.createGenreCard(genre);
            grid.appendChild(card);
        });

        // Update count
        const countElement = document.getElementById('genreCount');
        if (countElement) {
            countElement.textContent = Math.min(grid.children.length, this.searchResults.length);
        }

        // Add show more button again if there are still more results
        if (currentCount + this.genresPerPage < this.searchResults.length) {
            this.addShowMoreButton(grid);
        }
    }

    clearSearch() {
        this.searchQuery = '';
        this.searchResults = [];
        this.isSearchMode = false;
        
        // Clear search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Hide clear button
        this.showClearButton(false);
        
        // Update search stats
        this.updateSearchStats();
        
        // Show random genres
        this.showRandomGenres();
        
        // Update button text
        this.updateButtonText();
        
        // Focus search input
        if (searchInput) {
            searchInput.focus();
        }
    }

    showClearButton(show) {
        const clearBtn = document.getElementById('clearSearch');
        if (clearBtn) {
            clearBtn.style.display = show ? 'block' : 'none';
        }
    }

    updateButtonText() {
        const remixBtn = document.getElementById('remixBtn');
        const mobileRemixBtn = document.getElementById('mobileRemixBtn');
        
        const buttonText = this.isSearchMode ? 'Show Random Genres' : 'Refresh Genres';
        
        if (remixBtn) {
            remixBtn.innerHTML = `<i class="fas fa-sync-alt"></i> ${buttonText}`;
        }
        
        if (mobileRemixBtn) {
            mobileRemixBtn.innerHTML = `<i class="fas fa-sync-alt"></i> ${buttonText}`;
        }
    }

    showRandomGenres() {
        // Track random genres button click in search mode
        if (typeof gtag !== 'undefined') {
            gtag('event', 'show_random_genres', {
                event_category: 'user_interaction',
                event_label: 'search_mode',
                value: 1
            });
        }
        
        this.isSearchMode = false;
        this.displayRandomGenres();
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
        
        // Highlight search terms if in search mode
        const highlightedGenre = this.isSearchMode && this.searchQuery ? 
            this.highlightSearchTerms(genre, this.searchQuery) : genre;
        
        card.innerHTML = `
            <div class="genre-name">${highlightedGenre}</div>
            <div class="genre-description">${description}</div>
            <div class="genre-action">
                <i class="fab fa-spotify"></i>
            </div>
        `;

        card.addEventListener('click', () => this.openSpotifySearch(genre));
        
        return card;
    }

    highlightSearchTerms(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    generateGenreDescription(genre) {
        // Use the comprehensive descriptions from the external file
        if (typeof GENRE_DESCRIPTIONS !== 'undefined' && GENRE_DESCRIPTIONS[genre]) {
            return GENRE_DESCRIPTIONS[genre];
        }
        
        return 'A unique musical style with its own distinctive characteristics and cultural influences.';
    }

    openSpotifySearch(genre) {
        // Track genre click in search mode
        if (typeof gtag !== 'undefined') {
            gtag('event', 'genre_click', {
                event_category: 'user_interaction',
                event_label: genre,
                value: 1,
                custom_parameter_1: this.isSearchMode ? 'search_mode' : 'random_mode'
            });
        }
        
        const searchTerm = encodeURIComponent(genre);
        const spotifyUrl = `https://open.spotify.com/search/${searchTerm}`;
        window.open(spotifyUrl, '_blank');
    }

    showLoading(show) {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = show ? 'flex' : 'none';
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GenreMixer();
}); 