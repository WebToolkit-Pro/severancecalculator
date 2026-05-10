import os

def fix_file(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    replacements = {
        'â†—': '?',
        'â€º': '›',
        'âš¡': '?',
        'â€”': '—',
        'Ã¢â‚¬â€': '—'
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Fix all HTML files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            fix_file(os.path.join(root, file))
