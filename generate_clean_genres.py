#!/usr/bin/env python3
import re
import json

def escape_js_string(s):
    """Escape a string for JavaScript, handling quotes, backslashes, and special characters."""
    # Replace backslashes first
    s = s.replace('\\', '\\\\')
    # Replace single quotes
    s = s.replace("'", "\\'")
    # Replace double quotes
    s = s.replace('"', '\\"')
    # Replace ampersands
    s = s.replace('&', '\\&')
    # Replace newlines
    s = s.replace('\n', '\\n')
    return s

def parse_genres_file(filename):
    """Parse the genres.txt file and extract genre names and descriptions."""
    genres = []
    descriptions = {}
    
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
                
            # Match pattern: **Genre Name**: Description
            match = re.match(r'\*\*(.*?)\*\*:\s*(.*)', line)
            if match:
                genre_name = match.group(1).strip()
                description = match.group(2).strip()
                
                genres.append(genre_name)
                descriptions[genre_name] = description
    
    return genres, descriptions

def generate_js_file(genres, descriptions, output_filename):
    """Generate a clean JavaScript file with proper escaping."""
    with open(output_filename, 'w', encoding='utf-8') as f:
        # Write genres array
        f.write('const GENRES = [\n')
        for i, genre in enumerate(genres):
            escaped_genre = escape_js_string(genre)
            if i < len(genres) - 1:
                f.write(f"  '{escaped_genre}',\n")
            else:
                f.write(f"  '{escaped_genre}'\n")
        f.write('];\n\n')
        
        # Write descriptions object
        f.write('const GENRE_DESCRIPTIONS = {\n')
        for i, (genre, description) in enumerate(descriptions.items()):
            escaped_genre = escape_js_string(genre)
            escaped_description = escape_js_string(description)
            if i < len(descriptions) - 1:
                f.write(f"  '{escaped_genre}': '{escaped_description}',\n")
            else:
                f.write(f"  '{escaped_genre}': '{escaped_description}'\n")
        f.write('};\n')

def main():
    print("Parsing genres.txt...")
    genres, descriptions = parse_genres_file('genres.txt')
    
    print(f"Found {len(genres)} genres")
    print(f"Found {len(descriptions)} descriptions")
    
    print("Generating clean genres_data.js...")
    generate_js_file(genres, descriptions, 'genres_data_clean.js')
    
    print("Done! Created genres_data_clean.js")
    
    # Test the generated file
    print("Testing generated file...")
    try:
        with open('genres_data_clean.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # Try to evaluate it as JavaScript (basic test)
            if 'const GENRES = [' in content and 'const GENRE_DESCRIPTIONS = {' in content:
                print("✓ File structure looks correct")
            else:
                print("✗ File structure appears incorrect")
    except Exception as e:
        print(f"✗ Error reading generated file: {e}")

if __name__ == '__main__':
    main() 