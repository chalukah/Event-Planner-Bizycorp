import re
import os

def markdown_to_html(md_text):
    """Convert markdown text to HTML with proper hyperlink formatting"""
    # Convert bold **text** to <strong>text</strong>
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', md_text)

    # Convert links [text](url) to <a href="url">text</a>
    html = re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2">\1</a>', html)

    # Convert numbered lists
    lines = html.split('\n')
    processed_lines = []

    for line in lines:
        # Handle numbered lists
        if re.match(r'^\d+\.\s+', line):
            processed_lines.append(f'<p>{line}</p>')
        # Handle bullet points with special characters
        elif line.strip().startswith('▪️') or line.strip().startswith('✅'):
            processed_lines.append(f'<p>{line}</p>')
        # Handle emoji bullets
        elif re.match(r'^[🗓🕖🎯🎙⏰📅]\s+', line):
            processed_lines.append(f'<p>{line}</p>')
        # Regular paragraphs
        elif line.strip():
            processed_lines.append(f'<p>{line}</p>')
        else:
            processed_lines.append('<br>')

    html = '\n'.join(processed_lines)

    # Wrap in HTML structure
    full_html = f'''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {{
            font-family: Calibri, Arial, sans-serif;
            line-height: 1.6;
            font-size: 11pt;
            max-width: 800px;
            margin: 0;
            padding: 0;
        }}
        a {{
            color: #0066cc;
            text-decoration: underline;
        }}
        a:hover {{
            color: #004499;
        }}
        strong {{
            font-weight: bold;
        }}
        p {{
            margin: 8px 0;
        }}
        br {{
            line-height: 0.5;
        }}
    </style>
</head>
<body>
{html}
</body>
</html>'''

    return full_html

def extract_email_content(section_text):
    """Extract email content, removing the header metadata"""
    # Remove everything before "Hi [Name],"
    lines = section_text.split('\n')
    content_started = False
    content_lines = []

    for line in lines:
        # Skip header lines (To:, Cc:, Subject:, dashes)
        if line.startswith('**To:**') or line.startswith('**Cc:**') or line.startswith('**Subject:**'):
            continue
        if line.strip() == '---' or line.strip() == '----------------------------':
            continue
        if line.startswith('### '):
            continue
        if line.startswith('## '):
            continue
        if line.startswith('# '):
            continue

        # Start capturing when we hit the greeting
        if line.startswith('Hi '):
            content_started = True

        if content_started:
            content_lines.append(line)

    return '\n'.join(content_lines)

# Email files to convert
email_files = {
    'Oct 23 Mail - Questions.md': [
        ('KEITH TRUE', 'Oct 23 Mail - Questions - KEITH TRUE.html'),
        ('CHARLOTTE WEIR', 'Oct 23 Mail - Questions - CHARLOTTE WEIR.html')
    ],
    'Oct 24 Mail - Boost Registrations.md': [
        ('KEITH TRUE', 'Oct 24 Mail - Boost Registrations - KEITH TRUE.html'),
        ('CHARLOTTE WEIR', 'Oct 24 Mail - Boost Registrations - CHARLOTTE WEIR.html')
    ],
    'Oct 25 Mail - Help Reach More.md': [
        ('KEITH TRUE', 'Oct 25 Mail - Help Reach More - KEITH TRUE.html'),
        ('CHARLOTTE WEIR', 'Oct 25 Mail - Help Reach More - CHARLOTTE WEIR.html')
    ],
    'Oct 26 Mail.md': [
        ('KEITH TRUE', 'Oct 26 Mail - 3 Days Reminder - KEITH TRUE.html'),
        ('CHARLOTTE WEIR', 'Oct 26 Mail - 3 Days Reminder - CHARLOTTE WEIR.html')
    ],
    'Oct 28 Mail.md': [
        ('KEITH TRUE', 'Oct 28 Mail - Tomorrow Panel - KEITH TRUE.html'),
        ('CHARLOTTE WEIR', 'Oct 28 Mail - Tomorrow Panel - CHARLOTTE WEIR.html')
    ],
    'Oct 29 Mail.md': [
        ('EMAIL #6', 'Oct 29 Mail - Email 6 Today is Day - KEITH TRUE.html', 'KEITH TRUE'),
        ('EMAIL #6', 'Oct 29 Mail - Email 6 Today is Day - CHARLOTTE WEIR.html', 'CHARLOTTE WEIR'),
        ('EMAIL #7', 'Oct 29 Mail - Email 7 Starting in 2 Hours - KEITH TRUE.html', 'KEITH TRUE'),
        ('EMAIL #7', 'Oct 29 Mail - Email 7 Starting in 2 Hours - CHARLOTTE WEIR.html', 'CHARLOTTE WEIR'),
        ('EMAIL #8', 'Oct 29 Mail - Email 8 Starting Now - KEITH TRUE.html', 'KEITH TRUE'),
        ('EMAIL #8', 'Oct 29 Mail - Email 8 Starting Now - CHARLOTTE WEIR.html', 'CHARLOTTE WEIR')
    ],
    'Oct 30 Mail.md': [
        ('KEITH TRUE', 'Oct 30 Mail - Thank You - KEITH TRUE.html'),
        ('CHARLOTTE WEIR', 'Oct 30 Mail - Thank You - CHARLOTTE WEIR.html')
    ]
}

base_path = r'C:\Users\Bizycorp_Work\Documents\CLaude Vet\OCT 29 Panel Event'
created_files = []

# Process each email file
for md_file, outputs in email_files.items():
    input_path = os.path.join(base_path, md_file)

    if not os.path.exists(input_path):
        print(f"Warning: {md_file} not found, skipping...")
        continue

    # Read the markdown file with UTF-8 encoding
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Handle Oct 29 Mail specially (has 3 emails)
    if md_file == 'Oct 29 Mail.md':
        sections = content.split('## EMAIL #')
        for output_info in outputs:
            email_marker = output_info[0]
            output_file = output_info[1]
            panelist = output_info[2]

            # Find the right section
            for section in sections:
                if email_marker.replace('EMAIL #', '') in section and panelist in section:
                    # Extract just the panelist's content
                    panelist_parts = section.split('### ')
                    for part in panelist_parts:
                        if part.startswith(panelist):
                            email_content = extract_email_content(part)
                            html = markdown_to_html(email_content)

                            output_path = os.path.join(base_path, output_file)
                            with open(output_path, 'w', encoding='utf-8') as f:
                                f.write(html)
                            created_files.append(output_file)
                            break
    else:
        # Split by panelist sections
        sections = content.split('### ')

        for output_info in outputs:
            panelist = output_info[0]
            output_file = output_info[1]

            # Find the section for this panelist
            for section in sections:
                if section.startswith(panelist):
                    email_content = extract_email_content(section)
                    html = markdown_to_html(email_content)

                    output_path = os.path.join(base_path, output_file)
                    with open(output_path, 'w', encoding='utf-8') as f:
                        f.write(html)
                    created_files.append(output_file)
                    break

print("HTML EMAIL FILES CREATED SUCCESSFULLY!")
print(f"\nTotal files created: {len(created_files)}\n")
print("Files created:")
for file in sorted(created_files):
    print(f"  - {file}")

print("\n" + "="*60)
print("HOW TO USE THESE IN OUTLOOK:")
print("="*60)
print("1. Double-click any HTML file to open it in your browser")
print("2. Press Ctrl+A (Select All)")
print("3. Press Ctrl+C (Copy)")
print("4. Open Outlook and create new email")
print("5. Press Ctrl+V (Paste)")
print("6. All hyperlinks will work perfectly!")
print("="*60)
