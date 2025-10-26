import re
import os

def markdown_to_html(md_text):
    # Convert bold **text** to <strong>text</strong>
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', md_text)

    # Convert links [text](url) to <a href="url">text</a>
    html = re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2">\1</a>', html)

    # Convert numbered lists
    html = re.sub(r'^(\d+)\.\s+(.+)$', r'<p>\1. \2</p>', html, flags=re.MULTILINE)

    # Convert paragraphs (double newlines)
    paragraphs = html.split('\n\n')
    html_paragraphs = []
    for para in paragraphs:
        para = para.strip()
        if para and not para.startswith('<'):
            para = f'<p>{para}</p>'
        html_paragraphs.append(para)

    html = '\n'.join(html_paragraphs)

    # Wrap in basic HTML structure
    full_html = f'''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
        a {{ color: #0066cc; text-decoration: none; }}
        a:hover {{ text-decoration: underline; }}
        strong {{ font-weight: bold; }}
    </style>
</head>
<body>
{html}
</body>
</html>'''

    return full_html

# Convert the Questions email for Keith True
input_file = r'C:\Users\Bizycorp_Work\Documents\CLaude Vet\OCT 29 Panel Event\Oct 23 Mail - Questions.md'

# Read with UTF-8 encoding
with open(input_file, 'r', encoding='utf-8') as f:
    md_content = f.read()

# Split into Keith and Charlotte sections
sections = md_content.split('---')

# Process Keith's section (first section after header)
keith_section = sections[1] if len(sections) > 1 else md_content
keith_html = markdown_to_html(keith_section)

# Process Charlotte's section
charlotte_section = sections[2] if len(sections) > 2 else ""
charlotte_html = markdown_to_html(charlotte_section)

# Save HTML files with UTF-8 encoding
keith_output = r'C:\Users\Bizycorp_Work\Documents\CLaude Vet\OCT 29 Panel Event\Oct 23 Mail - Questions - KEITH TRUE.html'
charlotte_output = r'C:\Users\Bizycorp_Work\Documents\CLaude Vet\OCT 29 Panel Event\Oct 23 Mail - Questions - CHARLOTTE WEIR.html'

with open(keith_output, 'w', encoding='utf-8') as f:
    f.write(keith_html)

with open(charlotte_output, 'w', encoding='utf-8') as f:
    f.write(charlotte_html)

print("HTML files created successfully!")
print(f"Keith True: {keith_output}")
print(f"Charlotte Weir: {charlotte_output}")
print("\nTo use in Outlook:")
print("1. Open the HTML file in your browser")
print("2. Select all (Ctrl+A) and copy (Ctrl+C)")
print("3. Paste directly into Outlook - hyperlinks will be preserved!")
