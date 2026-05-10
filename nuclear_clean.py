import os

def nuclear_clean(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Target specific persistent mangled strings
    replacements = {
        'Ã¢â‚¬Âº': ' / ',      # Breadcrumb separator (Nuclear reset to slash)
        'Ã¢â€¹â€º': ' / ',     # Alternative breadcrumb
        'Ã¢â€ &mdash;': '&nearr;', # Pro Tools arrow
        'Ã¢â€ ': '&nearr;',    # Another arrow variant
        'Ã‚Â': ' ',            # Mangled space
        'Ã¢â‚¬Â': ' / ',      # Another breadcrumb variant
        'â€º': ' / ',          # Raw symbol cleanup
        'Â ': ' ',             # Raw space cleanup
        'Â': ' ',              # Raw space cleanup
        'Ã€': '',              # Random artifact
        'âš¡': '&#9889;',       # Lightning bolt entity
        'Ã„â€¹': '&nearr;',    # Nav arrow variant
        'Ã¢Å¡ ¡': '<i data-lucide="zap"></i>', # Button icon mangled
        '&mdash; Ã‚': '--',   # Result placeholder mangled
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    # Standardize casing one last time
    content = content.replace('PAKIsTAN', 'PAKISTAN')
    content = content.replace('GUIDEs', 'GUIDES')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Process all files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            nuclear_clean(os.path.join(root, file))
