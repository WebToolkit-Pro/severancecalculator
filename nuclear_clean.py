import os
def nuclear_clean(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    replacements = {
        'â€º': ' / ', 'â‹›': ' / ', 'â†&mdash;': '&nearr;', 
        'â†': '&nearr;', 'Â�': ' ', 'â€�': ' / ', '›': ' / ', 
        '� ': ' ', '�': ' ', 'À': '', '⚡': '&#9889;', 'Ä‹': '&nearr;',
        'âš �': '<i data-lucide="zap"></i>', '&mdash; Â': '--'
    }
    for old, new in replacements.items():
        content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'): nuclear_clean(os.path.join(root, file))
