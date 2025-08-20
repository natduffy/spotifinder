# Genre Update Rules for Spotifinder

This document defines the exact process for adding new music genres to the Spotifinder app. Follow these steps precisely to ensure consistency and proper integration.

## 🎯 **Process Overview**

When adding a new genre, you must update **4 files** and ensure the genre count increases by 1.

## 📝 **Step-by-Step Update Process**

### **1. Add Genre to Genres Array**
**File:** `genres_data.js`
**Location:** Find the alphabetically correct position in the `GENRES` array
**Action:** Insert the new genre name in alphabetical order

**Example:**
```javascript
// Find the right alphabetical position
  'West Coast Rap',
  'Western Swing',
  'Whimsigoth',  // ← NEW GENRE HERE
  'Wind Ensemble',
```

### **2. Add Genre Description**
**File:** `genres_data.js`
**Location:** Find the same alphabetical position in the `GENRE_DESCRIPTIONS` object
**Action:** Add the genre description with the exact same key

**Example:**
```javascript
// Find the same alphabetical position
  'West Coast Rap': 'Hip hop from the U.S. West Coast, known for funk samples and laid-back flow.',
  'Western Swing': 'A danceable country genre blending jazz, swing, and fiddle music.',
  'Whimsigoth': 'An internet aesthetic that incorporates the dark and moody characteristics of the gothic subculture with whimsical elements.',  // ← NEW DESCRIPTION HERE
  'Wind Ensemble': 'Classical music performed by a group of woodwind, brass, and percussion instruments.',
```

### **3. Update Genre Count in HTML Files**
**Files:** `index.html` AND `index-search.html`
**Location:** Find the genre count display span
**Action:** Increase the total genre count by 1

**Example:**
```html
<!-- Before: -->
Showing <span id="genreCount">12</span> of <span id="totalGenres">1384</span> genres

<!-- After: -->
Showing <span id="genreCount">12</span> of <span id="totalGenres">1385</span> genres
```

### **4. Update Meta Descriptions**
**Files:** `index.html` AND `index-search.html`
**Locations:** Update all meta tags that mention the genre count
**Action:** Increase all genre counts by 1

**Meta Tags to Update:**
- `og:description` - "Explore 1,XXX music genres"
- `twitter:description` - "Explore 1,XXX music genres"  
- `meta name="description"` - "Discover 1,XXX music genres"
- `og:description` (search page) - "Search and explore 1,XXX music genres in real-time"
- `twitter:description` (search page) - "Search and explore 1,XXX music genres in real-time"
- `meta name="description"` (search page) - "Search and discover 1,XXX music genres in real-time"

## 🔍 **Verification Checklist**

After making all updates, verify:

- [ ] Genre appears in `genres_data.js` array (alphabetically correct)
- [ ] Genre description appears in `genres_data.js` descriptions object
- [ ] Genre count increased by 1 in both HTML files
- [ ] All meta descriptions updated with new count
- [ ] Genre can be found via search functionality
- [ ] Genre appears in random mode rotations

## 📊 **Genre Count Tracking**

**Current Total:** 1,385 genres
**Last Added:** Whimsigoth
**Next Addition:** Will be 1,386 genres

## 🚨 **Critical Rules**

1. **ALWAYS update both HTML files** - random mode AND search mode
2. **ALWAYS maintain alphabetical order** in both array and descriptions
3. **ALWAYS increase genre count by exactly 1**
4. **ALWAYS update ALL meta descriptions** that mention genre count
5. **NEVER skip any of the 4 required file updates**

## 🧪 **Testing Process**

1. **Search for the new genre** in search mode
2. **Verify it appears** in search results
3. **Check random mode** shows updated count
4. **Confirm genre appears** occasionally in random rotations
5. **Validate meta descriptions** show correct count

## 📁 **Files Modified in Each Update**

- ✅ `genres_data.js` - Genre array and descriptions
- ✅ `index.html` - Random mode count and meta descriptions
- ✅ `index-search.html` - Search mode count and meta descriptions
- ✅ `GENRE-UPDATE-RULES.md` - This documentation (update count here too)

## 💡 **Pro Tips**

- Use search functionality to find the correct alphabetical position
- Copy-paste the genre name exactly as it appears in the array
- Double-check that both array and descriptions are updated at the same position
- Test the search functionality immediately after updates
- Commit changes only after all 4 files are properly updated

## 🔄 **Template for Future Updates**

**Genre Name:** [NEW_GENRE_NAME]
**Description:** [GENRE_DESCRIPTION]
**Current Count:** [CURRENT_COUNT]
**New Count:** [CURRENT_COUNT + 1]

**Files to Update:**
1. `genres_data.js` - Add to array and descriptions
2. `index.html` - Update count and meta descriptions
3. `index-search.html` - Update count and meta descriptions
4. `GENRE-UPDATE-RULES.md` - Update current count

---

**Last Updated:** December 2024
**Total Genres:** 1,385
**Next Addition:** Will be 1,386
