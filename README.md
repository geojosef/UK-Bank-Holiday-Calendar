# Numbered UK Bank Holidays Calendar

This Google Apps Script automatically creates a custom calendar with numbered UK Bank Holidays for each financial year (April to March). 
The script fetches official bank holiday data directly from the UK government's public API and organizes the holidays in a custom Google Calendar. Each holiday is numbered (e.g., `(1/9) New Year's Day`) within the financial year for easy tracking.

## Features

- Automatically fetches **official UK bank holidays** from the UK government's public API.
- Groups holidays by **financial year** (April 1 - March 31).
- **Numbers the holidays** within the financial year (e.g., `(1/9)`, `(2/9)`).
- Supports **custom Google Calendar creation** and automatically updates it daily using a time-driven trigger.
- Clears and recreates the calendar events to ensure up-to-date holiday listings.

## Installation and Setup

1. Copy the Script to Your Google Apps Script Editor:
   - Open Google Apps Script by navigating to https://script.google.com/ and creating a new project.
   - Copy and paste the provided `script.gs` file content into the script editor.

2. Create the Custom Calendar:
   - Ensure you have a Google Calendar where the script will create and manage events. If not, the script will automatically create a calendar named "Numbered UK Bank Holidays."

3. Authorize the Script:
   - Run the script for the first time by selecting `createNumberedBankHolidayCalendar` and clicking the play button.
   - Google will ask you to authorize the script to manage your calendar and fetch data from external services (UK government API).

4. Set Up the Trigger:
   - Use the script’s `createTrigger` function to set up a time-based trigger that will automatically run the script daily (or at your chosen frequency) to keep the calendar up to date.
   - To do this, select `createTrigger`, click on the play button, and the time-driven trigger will be created.

## Usage

Once the script is set up, it will automatically:
- Clear existing events in the custom calendar.
- Fetch the latest UK bank holiday data.
- Create numbered events for the financial year (April to March).
  
You can view this calendar in your Google Calendar app. Optionally, you can hide Google's default UK Holidays calendar and rely solely on this one.

## How It Works

1. **Fetching Data**: The script fetches data directly from the UK government bank holidays API (`https://www.gov.uk/bank-holidays.json`).
2. **Period Grouping**: The bank holidays are grouped by financial year (April 1st to March 31st).
3. **Numbering**: Each holiday is numbered within its respective financial year.
4. **Calendar Management**: The calendar is cleared and recreated daily (or according to your trigger), ensuring that any changes in bank holidays are reflected.

## Limitations

- **One-Off Holidays**: The script automatically handles special holidays (e.g., the Coronation of King Charles III) by fetching from the government API. However, if specific holiday formats change in the future, you may need to update the script.
- **Calendar Deletion/Recreation**: Each time the script runs, it deletes and recreates all events in the custom calendar, which could be inefficient if you have a large number of events. This is not an issue for most users, as UK holidays are a limited set.

## Customization

Feel free to modify the script to:
- Include holidays from different regions (e.g., Scotland or Northern Ireland) by adjusting the API data you pull from.
- Set different time-based triggers for updating the calendar less frequently if desired.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

---

## Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script/)
- [UK Government Bank Holidays API](https://www.gov.uk/bank-holidays)

---

## Author

Geo Joseph – https://github.com/geojosef

---

### Example

![Calendar Screenshot](link_to_screenshot_if_any)
