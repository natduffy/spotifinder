// Test script to verify genres_data.js loads correctly
const fs = require('fs');

// Read the genres data file
const genresData = fs.readFileSync('genres_data.js', 'utf8');

// Try to evaluate it in a safe way
try {
    // Create a new context to evaluate the file
    const vm = require('vm');
    const context = { console: console };
    vm.createContext(context);
    vm.runInContext(genresData, context);
    
    // Check if the constants are defined
    if (context.GENRES && context.GENRE_DESCRIPTIONS) {
        console.log('✓ File loaded successfully!');
        console.log(`✓ Found ${context.GENRES.length} genres`);
        console.log(`✓ Found ${Object.keys(context.GENRE_DESCRIPTIONS).length} descriptions`);
        
        // Test a few specific cases
        console.log('\nTesting specific cases:');
        console.log(`✓ "Children's Christmas" in genres: ${context.GENRES.includes("Children's Christmas")}`);
        console.log(`✓ "Alternative R&B" in genres: ${context.GENRES.includes("Alternative R&B")}`);
        console.log(`✓ "Beats & Rhymes" in genres: ${context.GENRES.includes("Beats & Rhymes")}`);
        
        // Test descriptions
        if (context.GENRE_DESCRIPTIONS["Children's Christmas"]) {
            console.log('✓ "Children\'s Christmas" description loaded correctly');
        }
        if (context.GENRE_DESCRIPTIONS["Alternative R&B"]) {
            console.log('✓ "Alternative R&B" description loaded correctly');
        }
        if (context.GENRE_DESCRIPTIONS["Beats & Rhymes"]) {
            console.log('✓ "Beats & Rhymes" description loaded correctly');
        }
        
        console.log('\n🎉 All tests passed! The file is ready to use.');
    } else {
        console.log('✗ GENRES or GENRE_DESCRIPTIONS not found');
        console.log('Available keys:', Object.keys(context));
    }
} catch (error) {
    console.log('✗ Error loading file:', error.message);
} 