import os

def clean_html(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Dictionary of mangled sequences to safe HTML entities or clean text
    replacements = {
        # Flags (Mangled -> HTML Entities or Clean Text)
        'Ã°Å¸â€¡ÂºÃ°Å¸â€¡Â¸': '&#127482;&#127480;', # US Flag
        'Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§': '&#127468;&#127463;', # UK Flag
        'Ã°Å¸â€¡Â¦Ã°Å¸â€¡Âª': '&#127462;&#127466;', # UAE Flag
        'Ã°Å¸â€¡Â®Ã°Å¸â€¡Â³': '&#127470;&#127475;', # India Flag
        'Ã°Å¸â€¡ÂµÃ°Å¸â€¡Â°': '&#127477;&#127472;', # Pakistan Flag
        'Ã°Å¸â€¡ÂµÃ°Å¸â€¡Â­': '&#127477;&#127470;', # Philippines Flag
        'Ã°Å¸â€¡Â¸Ã°Å¸â€¡Â¦': '&#127480;&#127462;', # Saudi Flag
        'Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â¦': '&#127464;&#127462;', # Canada Flag
        
        # Symbols (Mangled -> Entities)
        'Ã¢â‚¬â€': '&mdash;',
        'â€”': '&mdash;',
        'â€”Â': '&mdash;',
        'Ã¢â€¢â‚¬': '&mdash;',
        'Ã¢â€¢â‚¬Â': '&mdash;',
        'Ã¢â€¹â€º': '&rsaquo;',
        'â€º': '&rsaquo;',
        'â†—': '&nearr;',
        'Äâ€¹Äâ€¹': '&nearr;',
        'Äâ€¹': '&nearr;',
        'Ã„â€¹': '&nearr;',
        
        # Casing & Cleanup
        'PAKIsTAN': 'PAKISTAN',
        'sA': 'SA',
        'UsA': 'USA',
        'GUIDEs': 'GUIDES',
        'REsULTs': 'RESULTS',
        'sECTION': 'SECTION'
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    # Final check for any lingering "lightning" artifacts
    content = content.replace('âš¡', '&#9889;')
    content = content.replace('⚡', '&#9889;')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Process all HTML files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            clean_html(os.path.join(root, file))
