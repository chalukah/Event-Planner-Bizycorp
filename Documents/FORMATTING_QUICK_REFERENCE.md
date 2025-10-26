# VBI Panel Documents - Quick Reference Card

## Document Formatting Cheat Sheet

### Title Paragraphs
```python
para = doc.add_paragraph()
para.style = 'Title'
run = para.add_run('Panelist Name - Questions')
run.font.name = 'Arial'
run.font.size = Pt(26)
run.font.bold = False
```

### Normal Body Text
```python
para = doc.add_paragraph()
para.style = 'normal'
run = para.add_run('Your text here')
run.font.name = 'Georgia'
run.font.size = Pt(13)
para.paragraph_format.space_before = Pt(12)
para.paragraph_format.space_after = Pt(12)
```

### Questions with Hanging Indent
```python
para = doc.add_paragraph()
para.style = 'normal'
run = para.add_run('Question text here?')
run.font.name = 'Georgia'
run.font.size = Pt(13)
para.paragraph_format.left_indent = Inches(0.5)
para.paragraph_format.first_line_indent = Inches(-0.25)
para.paragraph_format.space_before = Pt(12)
para.paragraph_format.space_after = Pt(0)
```

### Mixed Formatting (Normal + Italic)
```python
para = doc.add_paragraph()
para.style = 'normal'

# Normal text
run1 = para.add_run('I've drafted questions for ')
run1.font.name = 'Georgia'
run1.font.size = Pt(13)

# Italic text
run2 = para.add_run('"Event Title Here"')
run2.font.name = 'Georgia'
run2.font.size = Pt(13)
run2.font.italic = True

# Back to normal
run3 = para.add_run('. Please review.')
run3.font.name = 'Georgia'
run3.font.size = Pt(13)

para.paragraph_format.space_before = Pt(12)
para.paragraph_format.space_after = Pt(12)
```

### Bold Paragraph
```python
para = doc.add_paragraph()
para.style = 'normal'
run = para.add_run('Please note: Important information here.')
run.font.name = 'Georgia'
run.font.size = Pt(13)
run.font.bold = True
para.paragraph_format.space_before = Pt(12)
para.paragraph_format.space_after = Pt(12)
```

### Heading 3
```python
para = doc.add_paragraph()
para.style = 'Heading 3'
run = para.add_run('Panelist 1: Name Here')
run.font.name = 'Georgia'
run.font.size = Pt(13)
run.font.bold = True
```

---

## Common Measurements

### EMU Conversions
- 1 inch = 914400 EMUs
- 1 point = 12700 EMUs
- 152400 EMUs ≈ 12pt ≈ 0.167"
- 457200 EMUs ≈ 36pt ≈ 0.5"
- 228600 EMUs ≈ 18pt ≈ 0.25"

### Using Pt() and Inches()
```python
from docx.shared import Pt, Inches

# Spacing
para.paragraph_format.space_before = Pt(12)
para.paragraph_format.space_after = Pt(12)

# Indentation
para.paragraph_format.left_indent = Inches(0.5)
para.paragraph_format.first_line_indent = Inches(-0.25)
```

---

## Document Types Summary

### Questions Document
- **Font**: Georgia 13pt
- **Sections**: 6 (one per panelist + reference)
- **Spacing**: Pt(12) before/after
- **Questions**: Hanging indent 0.5" / -0.25"

### Promotional Materials (Generic)
- **Font**: Spartan 10pt
- **Sections**: 4 (one per panelist)
- **Lists**: Hanging indent 0.792" / -0.25"
- **Headers**: Bold inline (not heading styles)

### Promotional Materials (Specific)
- **Font**: Merriweather (various sizes)
- **Sections**: 12 (multiple promo variations)
- **Spacing**: Pt(12) before/after
- **Contains**: Emojis, hashtags, URLs

### Partner Details
- **Font**: Mixed
- **Purpose**: Internal reference
- **Content**: Zoom details + landing page copy

---

## File Naming Patterns

- Questions: `[Name]_-_Questions.docx`
- Promotional (generic): `Promotional_Materials.docx`
- Promotional (specific): `[Name]_-_Promotional_Materials.docx`
- Partner details: `Partner_Details_Zoom_Landing_Page.docx`

**Note**: Fix typo "Matetrials" → "Materials" in automation code

---

## Import Statements

```python
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
```

---

## Section Management

### Add Section Break
```python
doc.add_section()
```

### Add Empty Paragraph (for spacing)
```python
doc.add_paragraph()
```

---

## Complete Minimal Example

```python
from docx import Document
from docx.shared import Pt, Inches

doc = Document()

# Title
para = doc.add_paragraph()
para.style = 'Title'
run = para.add_run('John Doe - Questions')
run.font.name = 'Arial'
run.font.size = Pt(26)

# Greeting
para = doc.add_paragraph()
para.style = 'normal'
run = para.add_run('Hi John,')
run.font.name = 'Georgia'
run.font.size = Pt(13)
para.paragraph_format.space_before = Pt(12)
para.paragraph_format.space_after = Pt(12)

# Question
para = doc.add_paragraph()
para.style = 'normal'
run = para.add_run('How do you approach technology in your practice?')
run.font.name = 'Georgia'
run.font.size = Pt(13)
para.paragraph_format.left_indent = Inches(0.5)
para.paragraph_format.first_line_indent = Inches(-0.25)
para.paragraph_format.space_before = Pt(12)
para.paragraph_format.space_after = Pt(0)

doc.save('output.docx')
```

---

## Key Findings

1. **No tables** used in any document
2. **Multi-run paragraphs** for inline formatting
3. **Hanging indents** instead of list styles
4. **Section breaks** vs **empty paragraphs** for spacing
5. **Font inconsistency** across document types
6. **Unicode/emoji** in promotional materials
7. **Typos** in automated filenames

---

## Analysis Files Location

All in: `C:\Users\Bizycorp_Work\Documents\CLaude Vet\`

- `document_structures.json` - Full JSON export
- `DOCUMENT_STRUCTURE_GUIDE.md` - Comprehensive guide
- `ANALYSIS_SUMMARY.md` - Executive summary
- `FORMATTING_QUICK_REFERENCE.md` - This cheat sheet

---

*Quick reference for VBI Panel Event document automation*
*Last updated: 2025-10-21*
