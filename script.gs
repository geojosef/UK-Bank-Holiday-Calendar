function createNumberedBankHolidayCalendar() {
  const NEW_CALENDAR_NAME = 'UK BHs';

  // Get or create the numbered bank holidays calendar
  let newCalendar = getOrCreateCalendar(NEW_CALENDAR_NAME);

  // Clear existing events in the new calendar
  clearCalendar(newCalendar);

  // Fetch bank holidays from the UK government API
  const bankHolidaysData = fetchUKBankHolidays();
  
  // Process and add the bank holidays to the custom calendar
  if (bankHolidaysData) {
    createAllEventsFromGovData(newCalendar, bankHolidaysData);
  }
}

// Function to fetch the bank holidays data from the UK government API
function fetchUKBankHolidays() {
  const url = 'https://www.gov.uk/bank-holidays.json';
  try {
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());

    // Return the bank holidays for England and Wales (adjust as needed)
    return data['england-and-wales'].events;
  } catch (error) {
    Logger.log('Error fetching UK Bank Holidays: ' + error);
    return null;
  }
}

// Function to create all events from the UK government data
function createAllEventsFromGovData(calendar, events) {
  const periodEvents = groupGovEventsByPeriod(events);

  createAllEvents(calendar, periodEvents);
}

// Function to group events by April-March periods
function groupGovEventsByPeriod(events) {
  const periods = {};
  
  events.forEach(event => {
    const eventDate = new Date(event.date); // Event date from the API
    const periodYear = eventDate.getMonth() < 3 ? eventDate.getFullYear() - 1 : eventDate.getFullYear();
    const periodKey = `${periodYear}-${periodYear + 1}`;

    if (!periods[periodKey]) periods[periodKey] = [];
    
    periods[periodKey].push({
      date: eventDate,
      title: event.title,
      isBankHoliday: true
    });
  });

  return periods;
}

// Function to create all events in the calendar
function createAllEvents(calendar, periodEvents) {
  Object.entries(periodEvents).forEach(([period, events]) => {
    const totalEvents = events.length;

    events.sort((a, b) => a.date - b.date).forEach((event, index) => {
      const numberedTitle = `(${index + 1}/${totalEvents}) ${event.title}`;
      Logger.log(`Creating event: ${numberedTitle} on ${event.date}`);
      calendar.createAllDayEvent(numberedTitle, event.date);
    });
  });
}

function getOrCreateCalendar(name) {
  const calendars = CalendarApp.getOwnedCalendarsByName(name);
  return calendars.length > 0 ? calendars[0] : CalendarApp.createCalendar(name);
}

function clearCalendar(calendar) {
  const events = calendar.getEvents(new Date(1970, 0, 1), new Date(2099, 11, 31));
  events.forEach(event => event.deleteEvent());
}

// Set up a time-driven trigger to run the script daily
function createTrigger() {
  ScriptApp.newTrigger('createNumberedBankHolidayCalendar')
    .timeBased()
    .everyDays(1)
    .create();
}
