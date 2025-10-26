/**
 * Inspect Excel Sheet Structure
 * Reads the Excel file and outputs the exact structure, headers, and layout
 */

import XLSX from 'xlsx';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const excelPath = join(__dirname, '../Event_Panel_Checklist/Events_ PANELS_filled.xlsx');

try {
  const buffer = readFileSync(excelPath);
  const workbook = XLSX.read(buffer, { type: 'buffer' });

  console.log('📊 WORKBOOK STRUCTURE\n');
  console.log('Sheet Names:', workbook.SheetNames);
  console.log('\n='.repeat(80));

  // Analyze each sheet
  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

    console.log(`\n📄 SHEET: ${sheetName}`);
    console.log(`   Range: ${worksheet['!ref']}`);
    console.log(`   Rows: ${range.e.r + 1}, Columns: ${range.e.c + 1}`);
    console.log('\n' + '-'.repeat(80));

    // Get all data as JSON to see structure
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

    console.log('\n🔍 FIRST 30 ROWS (RAW DATA):\n');
    data.slice(0, 30).forEach((row, idx) => {
      console.log(`Row ${idx + 1}:`, JSON.stringify(row));
    });

    // Analyze column structure
    console.log('\n📋 COLUMN HEADERS (Row 1):\n');
    if (data[0]) {
      data[0].forEach((header, idx) => {
        const colLetter = String.fromCharCode(65 + idx);
        console.log(`  ${colLetter}: "${header}"`);
      });
    }

    // Show merged cells if any
    if (worksheet['!merges']) {
      console.log('\n🔗 MERGED CELLS:\n');
      worksheet['!merges'].forEach((merge) => {
        console.log(`  ${XLSX.utils.encode_range(merge)}`);
      });
    }

    // Show column widths if defined
    if (worksheet['!cols']) {
      console.log('\n📏 COLUMN WIDTHS:\n');
      worksheet['!cols'].forEach((col, idx) => {
        if (col) {
          const colLetter = String.fromCharCode(65 + idx);
          console.log(`  ${colLetter}: ${col.wch || col.width || 'auto'}`);
        }
      });
    }

    console.log('\n' + '='.repeat(80));
  });

  console.log('\n✅ Structure analysis complete!\n');

} catch (error) {
  console.error('❌ Error reading Excel file:', error.message);
  process.exit(1);
}
