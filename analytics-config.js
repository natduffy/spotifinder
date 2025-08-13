// Analytics Configuration for Spotifinder
// Replace G-XXXXXXXXXX with your actual Google Analytics 4 Measurement ID

const ANALYTICS_CONFIG = {
    // Google Analytics 4 Measurement ID
    GA4_ID: 'G-HVCM91EMTM', // Your actual GA4 ID
    
    // Custom dimensions and metrics
    CUSTOM_DIMENSIONS: {
        PAGE_MODE: 'custom_parameter_1',
        USER_INTERACTION: 'custom_parameter_2',
        SEARCH_BEHAVIOR: 'custom_parameter_3'
    },
    
    // Event categories
    EVENT_CATEGORIES: {
        USER_INTERACTION: 'user_interaction',
        SEARCH_BEHAVIOR: 'search_behavior',
        PAGE_VIEW: 'page_view'
    },
    
    // Event names
    EVENTS: {
        PAGE_VIEW: 'page_view',
        REFRESH_GENRES: 'refresh_genres',
        GENRE_CLICK: 'genre_click',
        SEARCH_QUERY: 'search_query',
        SHOW_RANDOM_GENRES: 'show_random_genres'
    }
};

// Helper function to safely call gtag
function safeGtag(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    } else {
        console.log('Analytics event:', eventName, parameters);
    }
}

// Helper function to track page views
function trackPageView(pageTitle, pageMode) {
    safeGtag(ANALYTICS_CONFIG.EVENTS.PAGE_VIEW, {
        page_title: pageTitle,
        page_location: window.location.href,
        page_mode: pageMode
    });
}

// Helper function to track user interactions
function trackUserInteraction(eventName, eventLabel, pageMode, value = 1) {
    safeGtag(eventName, {
        event_category: ANALYTICS_CONFIG.EVENT_CATEGORIES.USER_INTERACTION,
        event_label: eventLabel,
        value: value,
        [ANALYTICS_CONFIG.CUSTOM_DIMENSIONS.PAGE_MODE]: pageMode
    });
}

// Helper function to track search behavior
function trackSearchBehavior(query) {
    safeGtag(ANALYTICS_CONFIG.EVENTS.SEARCH_QUERY, {
        event_category: ANALYTICS_CONFIG.EVENT_CATEGORIES.SEARCH_BEHAVIOR,
        event_label: query,
        value: query.length,
        [ANALYTICS_CONFIG.CUSTOM_DIMENSIONS.SEARCH_BEHAVIOR]: 'search_mode'
    });
}
