import type { Panelist, EventChecklist } from '../types';
import { buildEventChecklistSheetData } from './excelParser';

// Google Sheets API configuration
const GOOGLE_API_KEY = 'YOUR_API_KEY'; // User needs to add their own
const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com'; // User needs to add their own
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

let gapiInitialized = false;
let tokenClient: any = null;
let accessToken: string | null = null;

/**
 * Initializes the Google API client
 */
export async function initGoogleAPI(): Promise<void> {
  if (gapiInitialized) return;

  return new Promise((resolve, reject) => {
    // Load gapi script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client', async () => {
        try {
          await window.gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          });
          gapiInitialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    };
    script.onerror = reject;
    document.head.appendChild(script);

    // Load Google Identity Services
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.onload = () => {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: '', // Will be set during authentication
      });
    };
    document.head.appendChild(gisScript);
  });
}

/**
 * Authenticates with Google and gets access token
 */
export async function authenticateGoogle(): Promise<string> {
  if (!gapiInitialized) {
    await initGoogleAPI();
  }

  return new Promise((resolve, reject) => {
    if (accessToken) {
      resolve(accessToken);
      return;
    }

    tokenClient.callback = (response: any) => {
      if (response.error) {
        reject(response);
        return;
      }
      accessToken = response.access_token || null;
      if (accessToken) {
        window.gapi.client.setToken({ access_token: accessToken });
        resolve(accessToken);
      } else {
        reject(new Error('No access token received'));
      }
    };

    tokenClient.requestAccessToken();
  });
}

/**
 * Extracts spreadsheet ID from Google Sheets URL
 */
export function extractSpreadsheetId(url: string): string | null {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

function extractGid(url: string): number | null {
  const match = url.match(/[?&]gid=([0-9]+)/);
  return match ? Number(match[1]) : null;
}

/**
 * Reads data from a Google Sheet
 */
export async function readGoogleSheet(
  spreadsheetId: string,
  range: string = 'Sheet1!A:L'
): Promise<string[][]> {
  if (!gapiInitialized) {
    await initGoogleAPI();
  }

  if (!accessToken) {
    await authenticateGoogle();
  }

  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.result.values || [];
  } catch (error) {
    console.error('Error reading Google Sheet:', error);
    throw new Error('Failed to read Google Sheet. Please check the URL and permissions.');
  }
}

/**
 * Converts Google Sheets data to Panelist objects
 */
export function sheetsDataToPanelists(data: string[][]): Panelist[] {
  if (data.length < 2) {
    throw new Error('Sheet must have at least a header row and one data row');
  }

  const headers = data[0];
  const panelists: Panelist[] = [];

  // Expected column indices
  const getColumnIndex = (name: string) => {
    const index = headers.findIndex(h =>
      h.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (index === -1) {
      throw new Error(`Required column not found: ${name}`);
    }
    return index;
  };

  try {
    const indices = {
      firstName: getColumnIndex('First Name'),
      fullName: getColumnIndex('Full Name'),
      email: getColumnIndex('Email'),
      zoomJoinLink: getColumnIndex('Zoom Join Link'),
      registrationTrackingLink: getColumnIndex('Registration Tracking Link'),
      promotionalMaterialsLink: headers.findIndex(h =>
        h.toLowerCase().includes('promotional')
      ),
      finalBannerLink: headers.findIndex(h =>
        h.toLowerCase().includes('banner')
      ),
      question1: headers.findIndex(h => h.toLowerCase().includes('question 1')),
      question2: headers.findIndex(h => h.toLowerCase().includes('question 2')),
      question3: headers.findIndex(h => h.toLowerCase().includes('question 3')),
      question4: headers.findIndex(h => h.toLowerCase().includes('question 4')),
      question5: headers.findIndex(h => h.toLowerCase().includes('question 5')),
    };

    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      if (!row || row.length === 0 || row.every(cell => !cell)) {
        continue; // Skip empty rows
      }

      const questions: string[] = [];
      [indices.question1, indices.question2, indices.question3, indices.question4, indices.question5]
        .forEach(idx => {
          questions.push(idx >= 0 ? (row[idx] || '') : '');
        });

      panelists.push({
        id: crypto.randomUUID(),
        firstName: row[indices.firstName] || '',
        fullName: row[indices.fullName] || '',
        email: row[indices.email] || '',
        zoomJoinLink: row[indices.zoomJoinLink] || '',
        registrationTrackingLink: row[indices.registrationTrackingLink] || '',
        promotionalMaterialsLink: indices.promotionalMaterialsLink >= 0
          ? (row[indices.promotionalMaterialsLink] || '')
          : '',
        questionsLink: '',
        finalBannerLink: indices.finalBannerLink >= 0
          ? (row[indices.finalBannerLink] || '')
          : '',
        questions,
      });
    }

    return panelists;
  } catch (error) {
    console.error('Error converting sheets data:', error);
    throw error;
  }
}

/**
 * Imports panelists from a Google Sheet URL
 */
export async function importPanelistsFromSheet(sheetUrl: string): Promise<Panelist[]> {
  const spreadsheetId = extractSpreadsheetId(sheetUrl);

  if (!spreadsheetId) {
    throw new Error('Invalid Google Sheets URL');
  }

  const data = await readGoogleSheet(spreadsheetId);
  return sheetsDataToPanelists(data);
}

/**
 * Checks if Google Sheets API is configured
 */
export function isGoogleAPIConfigured(): boolean {
  return GOOGLE_API_KEY !== 'YOUR_API_KEY' &&
         GOOGLE_CLIENT_ID !== 'YOUR_CLIENT_ID.apps.googleusercontent.com';
}

function columnIndexToLetter(index: number): string {
  let result = '';
  let current = Math.max(index, 1);

  while (current > 0) {
    const remainder = (current - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    current = Math.floor((current - 1) / 26);
  }

  return result;
}

async function resolveSheetTitle(spreadsheetId: string, gid: number | null): Promise<string> {
  if (!gapiInitialized) {
    await initGoogleAPI();
  }

  if (!accessToken) {
    await authenticateGoogle();
  }

  const response = await window.gapi.client.sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets(properties(sheetId,title))',
  });

  const sheets = response.result.sheets || [];
  if (sheets.length === 0) {
    throw new Error('No sheets found in the spreadsheet');
  }

  const target = gid != null
    ? sheets.find((sheet: any) => sheet.properties?.sheetId === gid)
    : null;

  return (target || sheets[0]).properties?.title || 'Sheet1';
}

export async function syncChecklistToGoogleSheet(
  sheetUrl: string,
  checklist: EventChecklist
): Promise<void> {
  const spreadsheetId = extractSpreadsheetId(sheetUrl);
  if (!spreadsheetId) {
    throw new Error('Invalid Google Sheets URL');
  }

  const gid = extractGid(sheetUrl);
  const sheetTitle = await resolveSheetTitle(spreadsheetId, gid);

  const values = buildEventChecklistSheetData(checklist).map((row) =>
    row.map((cell) => (cell ?? '') as string | number)
  );

  const columnCount = values.reduce((max, row) => Math.max(max, row.length), 0) || 1;
  const clearColumnLetter = columnIndexToLetter(columnCount);
  const clearRowCount = Math.max(values.length + 50, 200);
  const clearRange = `${sheetTitle}!A1:${clearColumnLetter}${clearRowCount}`;

  if (!gapiInitialized) {
    await initGoogleAPI();
  }
  await authenticateGoogle();

  await window.gapi.client.sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: clearRange,
  });

  await window.gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetTitle}!A1`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values,
    },
  });
}

/**
 * Configuration instructions for users
 */
export const GOOGLE_SHEETS_SETUP_INSTRUCTIONS = `
# Google Sheets API Setup Instructions

1. Go to https://console.cloud.google.com/
2. Create a new project: "VBI Panel Email Generator"
3. Enable Google Sheets API:
   - Click "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create OAuth 2.0 Credentials:
   - Go to "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Authorized redirect URIs: http://localhost:3000
5. Copy your Client ID and API Key
6. Update src/utils/googleSheetsAPI.ts:
   - Replace GOOGLE_API_KEY with your API key
   - Replace GOOGLE_CLIENT_ID with your client ID
7. Save and restart the app

Alternative: Use CSV Export
- If API setup is too complex, you can export your Google Sheet as CSV
- File → Download → Comma Separated Values (.csv)
- Import the CSV file directly into the app
`;
