import os
import re

def final_repair(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Target the specific broken script leak pattern in hrefs
    # Example: href="/ "blog/" + $args[0].Groups[1].Value.ToLower() + ".html" "
    pattern = r'href="/\s+"blog/" \+ \$args\[0\]\.Groups\[1\]\.Value\.ToLower\(\) \+ "\.html"\s+"'
    content = re.sub(pattern, 'href="/blog/index.html"', content) # Fallback to index if unsure
    
    # More targeted fixes for the blog index specifically
    if "uae-gratuity.html" not in content and "blog/index.html" in path:
        # Rebuild the main guides links if they are broken
        content = content.replace('href="/ \n        "blog/" + $args[0].Groups[1].Value.ToLower() + ".html" \n    "', 'href="/blog/uae-gratuity.html"') # UAE
        # We'll just do a broad cleanup of any remaining $args leaks
        content = re.sub(r'/\s+"blog/" \+ \$args\[0\].*?\.html"\s+', '/blog/index.html', content)

    # Clean up the specific leaked text string everywhere
    leaked_text = '"blog/" + $args[0].Groups[1].Value.ToLower() + ".html"'
    content = content.replace(leaked_text, "")
    
    # Fix broken opening tags caused by the leak
    content = content.replace('href="/ \n         \n    "', 'href="/blog/index.html"')
    content = content.replace('href="/ \n     \n    "', 'href="/blog/index.html"')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Process all files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            final_repair(os.path.join(root, file))

# Re-apply the specific correct links to the blog index
blog_index = "blog/index.html"
if os.path.exists(blog_index):
    with open(blog_index, 'r', encoding='utf-8') as f:
        c = f.read()
    # Manually restore the 8 main guide links in the index
    c = c.replace('href="/blog/index.html"', 'href="/blog/uae-gratuity.html"', 1)
    c = c.replace('href="/blog/index.html"', 'href="/blog/saudi-gratuity.html"', 1)
    c = c.replace('href="/blog/index.html"', 'href="/blog/uk-redundancy.html"', 1)
    c = c.replace('href="/blog/index.html"', 'href="/blog/india-gratuity.html"', 1)
    c = c.replace('href="/blog/index.html"', 'href="/blog/pakistan-gratuity.html"', 1)
    c = c.replace('href="/blog/index.html"', 'href="/blog/philippines-separation.html"', 1)
    c = c.replace('href="/blog/index.html"', 'href="/blog/usa-severance.html"', 1)
    c = c.replace('href="/blog/index.html"', 'href="/blog/canada-severance.html"', 1)
    with open(blog_index, 'w', encoding='utf-8') as f:
        f.write(c)
