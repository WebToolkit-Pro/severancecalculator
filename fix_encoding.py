import os

def fix_file(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    replacements = {
        'PAKIsTAN': 'PAKISTAN',
        'SAudi': 'saudi',
        'SAlary': 'Salary',
        'United states': 'United States',
        'Ã°Å¸â€¡ÂºÃ°Å¸â€¡Â¸': '🇺🇸',
        'Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§': '🇬🇧',
        'Ã°Å¸â€¡Â¦Ã°Å¸â€¡Âª': '🇦🇪',
        'Ã°Å¸â€¡Â®Ã°Å¸â€¡Â³': '🇮🇳',
        'Ã°Å¸â€¡ÂµÃ°Å¸â€¡Â°': '🇵🇰',
        'Ã°Å¸â€¡ÂµÃ°Å¸â€¡Â­': '🇵🇭',
        'Ã°Å¸â€¡Â¸Ã°Å¸â€¡Â¦': '🇸🇦',
        'Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â¦': '🇨🇦',
        'Ã¢â‚¬â€': '—',
        'â€º': '›',
        's ⚡': '⚡'
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Fix specific files
fix_file('index.html')
fix_file('blog/index.html')
fix_file('about.html')
fix_file('contact.html')
