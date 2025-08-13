# Analytics Setup Guide for Spotifinder

This guide explains how to set up Google Analytics 4 (GA4) tracking for your Spotifinder music genre discovery app.

## What's Included

The analytics implementation includes:

- **Page View Tracking**: Tracks when users visit random mode vs search mode
- **User Interaction Tracking**: Monitors button clicks, genre selections, and page refreshes
- **Search Behavior Analytics**: Tracks search queries and search patterns
- **Custom Dimensions**: Page mode, user interaction type, and search behavior
- **Event Categorization**: Organized tracking for different types of user actions

## Setup Steps

### 1. Get Your Google Analytics 4 ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Set up a web data stream for your domain
4. Copy your Measurement ID (format: G-XXXXXXXXXX)

### 2. Configure Analytics

1. Open `analytics-config.js`
2. Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID:
   ```javascript
   GA4_ID: 'G-XXXXXXXXXX', // Replace with your actual GA4 ID
   ```

### 3. Deploy

1. Upload all files to your web server
2. Ensure `analytics-config.js` is accessible
3. Test that analytics events are firing in your GA4 dashboard

## Tracked Events

### Page Views
- **Random Mode**: `page_view` with `page_mode: 'random'`
- **Search Mode**: `page_view` with `page_mode: 'search'`

### User Interactions
- **Refresh Genres**: `refresh_genres` event
- **Genre Clicks**: `genre_click` with genre name and mode
- **Show Random Genres**: `show_random_genres` from search mode

### Search Behavior
- **Search Queries**: `search_query` with query text and length
- **Search Results**: Tracks number of results found

## Custom Dimensions

The analytics setup uses GA4 custom parameters:

- `custom_parameter_1`: Page mode (random/search)
- `custom_parameter_2`: User interaction type
- `custom_parameter_3`: Search behavior patterns

## Testing Analytics

1. Open your website
2. Open browser DevTools → Console
3. Perform actions (click buttons, search, etc.)
4. You should see analytics events logged
5. Check your GA4 Real-Time reports

## Privacy Considerations

- Analytics respect user privacy settings
- No personally identifiable information is collected
- Events are anonymized and aggregated
- Users can opt-out via browser settings

## Troubleshooting

### Analytics Not Working?
- Check that `analytics-config.js` is loaded before GA4 script
- Verify your GA4 ID is correct
- Ensure the file paths are correct
- Check browser console for JavaScript errors

### Events Not Showing in GA4?
- Wait 24-48 hours for data to appear
- Check Real-Time reports for immediate feedback
- Verify your GA4 property settings
- Ensure your domain is properly configured

## Advanced Customization

You can extend the analytics by:

- Adding more custom dimensions
- Tracking additional user behaviors
- Implementing conversion goals
- Setting up custom audiences
- Creating custom reports

## Support

For analytics setup issues:
1. Check the browser console for errors
2. Verify your GA4 configuration
3. Test with the browser's network tab
4. Ensure all scripts are loading properly

## Files Modified

- `index.html` - Added analytics tracking for random mode
- `index-search.html` - Added analytics tracking for search mode
- `script.js` - Added event tracking for user interactions
- `script-search.js` - Added search behavior tracking
- `analytics-config.js` - Centralized analytics configuration
- `ANALYTICS-SETUP.md` - This setup guide
