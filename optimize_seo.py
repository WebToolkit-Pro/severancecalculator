import os

def optimize_seo(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    if os.path.basename(path) == "index.html":
        # New optimized values
        new_title = "Severance Pay Calculator 2025 — Global Official Tool"
        new_desc = "Calculate your exact severance pay or gratuity with our free 2025 global tool. Accurate results based on official labor laws for multiple countries."
        
        import re
        content = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', content)
        content = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{new_desc}">', content)
        content = re.sub(r'<meta property="og:title" content=".*?">', f'<meta property="og:title" content="{new_title}">', content)
        content = re.sub(r'<meta property="og:description" content=".*?">', f'<meta property="og:description" content="{new_desc}">', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Process files
optimize_seo('index.html')
# Run deep clean script afterwards to ensure no mangling
os.system('python deep_clean.py')
