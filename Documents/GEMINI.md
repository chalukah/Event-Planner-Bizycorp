# GEMINI.md

## Project Overview

This project is a Python-based command-line tool designed to automate the creation of a comprehensive package for veterinary panel events. The system, named "Enhanced Panel Event Automation System," generates a complete set of materials based on a user-defined configuration file.

The generated package includes:

*   A structured directory for the event.
*   Promotional materials, including banners and posters in various sizes.
*   Email templates for invitations and follow-ups.
*   Panelist-specific questions.
*   A master tracking spreadsheet.

The primary technologies used are:

*   **Python:** The core language for the automation scripts.
*   **openpyxl:** For creating and updating Microsoft Excel files (`.xlsx`).
*   **python-docx:** For generating Microsoft Word documents (`.docx`).
*   **Pillow:** For creating promotional banners and posters as PNG images.

## Building and Running

This is a Python-based project and does not require a separate build step. The scripts can be run directly using a Python interpreter.

### Prerequisites

*   Python 3.x
*   The following Python packages (the script attempts to install them automatically if they are missing):
    *   `openpyxl`
    *   `python-docx`
    *   `Pillow`

### Running the Automation

1.  **Configure the Event:**
    *   Open the `event_config.json` file in a text editor.
    *   Fill in the details for the event, including the date, topic, panelist information, and other event-specific data.

2.  **Execute the Script:**
    *   **On Windows:** Double-click the `RUN_ME.bat` file.
    *   **From the Command Line:** Run the following command in the project's root directory:
        ```bash
        python create_panel_event.py
        ```

### Testing

There are no dedicated test files in this project. To test the system, you can:

1.  Modify the `event_config.json` with test data.
2.  Run the automation script as described above.
3.  Inspect the generated files in the `Panel_Events/` directory to ensure they are created correctly and contain the expected information.

## Development Conventions

*   **Configuration:** The application is configured through a single `event_config.json` file, which centralizes all event-specific data.
*   **Modularity:** The core logic is encapsulated in the `EnhancedPanelEventAutomation` class in `enhanced_panel_automation.py`, separating it from the main execution script (`create_panel_event.py`).
*   **Templates:** The system uses templates located in the `VET_Templates/` directory for generating Word and Excel files.
*   **Error Handling:** The scripts include basic error handling for missing files and invalid JSON configuration.
*   **User-Friendliness:** The inclusion of a `.bat` file and clear instructions in the `README.md` file makes the tool accessible to non-developers.
