import type { PanelEvent, Panelist } from '../types';
import {
  generatePanelistPromoContent,
  generateEmailPromoContent,
  generateSpeaker1PromoDocument,
  generateQuestionsDocument,
  generateGeneralPromoDocument,
} from './aiDocumentGenerator';

/**
 * Panel Assets Manager
 * Creates folder structure and generates all promotional documents for a panel event
 */

/**
 * Get the base assets path for a panel event
 */
export function getPanelAssetsPath(event: PanelEvent): string {
  // Format: YYYY-MM-DD - Panel Name
  const dateFormatted = formatEventDateForFolder(event.eventDateFull);
  const folderName = `${dateFormatted} - ${event.panelTitle}`;
  return `C:\\Users\\Bizycorp_Work\\Documents\\CLaude Vet\\Panel Assets\\${folderName}`;
}

/**
 * Format event date for folder name (YYYY-MM-DD)
 */
function formatEventDateForFolder(eventDateFull: string): string {
  // Parse "Wednesday, October 29th, 2025" to "2025-10-29"
  try {
    const date = new Date(eventDateFull);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    // Fallback
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Generate folder structure for panel event
 */
export function getPanelFolderStructure(event: PanelEvent): string[] {
  const basePath = getPanelAssetsPath(event);

  const folders = [
    basePath,
    `${basePath}\\General Promotional Materials`,
    `${basePath}\\Panel Date - Slide Deck PowerPoint`,
    `${basePath}\\Partner Details & Zoom Landing Page Details`,
    `${basePath}\\Promo Banners`,
    `${basePath}\\Questions for the Panel`,
    `${basePath}\\Zoom Landing Banners`,
    `${basePath}\\${formatEventDateForFolder(event.eventDateFull)} - ${event.panelTitle}`,
  ];

  // Add speaker-specific folders for each panelist
  event.panelists.forEach((panelist, index) => {
    folders.push(`${basePath}\\Speaker ${index + 1} - Promotional Materials`);
  });

  return folders;
}

/**
 * Generate all promotional documents for a panel event
 */
export async function generateAllPanelDocuments(
  event: PanelEvent
): Promise<Map<string, string>> {
  const documents = new Map<string, string>();
  const basePath = getPanelAssetsPath(event);

  // Generate General Promotional Materials
  const generalPromoHtml = generateGeneralPromoDocument(event, event.panelists);
  documents.set(
    `${basePath}\\General Promotional Materials\\General Promotional Materials.html`,
    generalPromoHtml
  );

  // Generate Questions for the Panel
  const questionsHtml = generateQuestionsDocument(event, event.panelists);
  documents.set(
    `${basePath}\\Questions for the Panel\\Questions for the Panel.html`,
    questionsHtml
  );

  // Generate Speaker-specific promotional materials
  for (let i = 0; i < event.panelists.length; i++) {
    const panelist = event.panelists[i];
    const speakerNum = i + 1;

    // Generate 5 promo variations + 1 email promo
    const promoContents = await Promise.all([
      generatePanelistPromoContent(event, panelist, 1),
      generatePanelistPromoContent(event, panelist, 2),
      generatePanelistPromoContent(event, panelist, 3),
      generatePanelistPromoContent(event, panelist, 4),
      generatePanelistPromoContent(event, panelist, 5),
    ]);

    const emailContent = await generateEmailPromoContent(event, panelist);

    const speakerPromoHtml = generateSpeaker1PromoDocument(
      event,
      panelist,
      promoContents,
      emailContent
    );

    documents.set(
      `${basePath}\\Speaker ${speakerNum} - Promotional Materials\\Speaker ${speakerNum} - Promotional Materials.html`,
      speakerPromoHtml
    );
  }

  return documents;
}

/**
 * Get instructions for creating the panel assets
 * This returns instructions for the user to run in their terminal/file system
 */
export function getPanelAssetsInstructions(event: PanelEvent): {
  folders: string[];
  documents: Map<string, string>;
  message: string;
} {
  const folders = getPanelFolderStructure(event);
  const basePath = getPanelAssetsPath(event);

  return {
    folders,
    documents: new Map(), // Will be populated when documents are generated
    message: `Panel Assets will be created at:\n${basePath}\n\nThis includes:\n- General Promotional Materials\n- Questions for the Panel\n- ${event.panelists.length} Speaker Promotional Materials folders\n- Promo Banners folder\n- Zoom Landing Banners folder`,
  };
}
